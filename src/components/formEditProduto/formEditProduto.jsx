import { useEffect, useState } from "react";
import "./formEditProduto.css";
import { Link, useParams } from "react-router-dom";
import { editarProduto } from "../../api/apiProduto";
import { listarProdutos } from "../../api/apiProduto";

export function FormEditProduto() {
    const { id } = useParams();
    const [isSaved, setIsSaved] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        sellerName: "",
        description: "",
        currency: "R$",
        phone: "",
        imageName: "",
        preview: null
    });

    // -------- CARREGAR DADOS DO PRODUTO --------
    useEffect(() => {
        async function carregarProduto() {
            const res = await listarProdutos();
            const produto = res.data.find((item) => item._id === id);

            if (!produto) return;

            setFormData({
                name: produto.nome || "",
                price: produto.preco || "",
                sellerName: produto.vendendor || "",
                description: produto.descricao || "",
                currency: produto.moeda || "R$",
                phone: produto.telefone || "",
                imageName: produto.imagem?.replace("/produtos/", "") || "",
                preview: produto.imagem || null
            });
        }

        carregarProduto();
    }, [id]);

    // -------- TRATAR TROCA DE IMAGEM --------
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                preview: URL.createObjectURL(file),
                imageName: file.name
            });
        }
    }

    // -------- MÁSCARA DE TELEFONE --------
    function formatPhone(value) {
        if (!value) return "";

        value = value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        } else if (value.length > 2) {
            return value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            return value.replace(/(\d{0,2})/, "($1");
        }
    }

    function handlePhoneChange(e) {
        setFormData({
            ...formData,
            phone: formatPhone(e.target.value)
        });
    }

    // -------- ENVIAR FORMULÁRIO --------
    async function handleSubmit(e) {
        e.preventDefault();

        const produtoAtualizado = {
            imagem: `/produtos/${formData.imageName}`,
            nome: formData.name,
            descricao: formData.description,
            preco: formData.price,
            vendendor: formData.sellerName,
            telefone: formData.phone,
            moeda: formData.currency
        };

        try {
            await editarProduto(id, produtoAtualizado);
            alert("Produto atualizado com sucesso!");
            setIsSaved(true);
        } catch (erro) {
            console.error("Erro ao editar produto", erro);
            alert("Falha ao editar produto!");
        }
    }

    return (
        <form className="newProduto__form" onSubmit={handleSubmit}>
            <div className="form__top">

                {/* IMAGEM */}
                <div className="form__image">
                    <p className="image__text">Imagem do Produto</p>

                    <div className="image__box">
                        {formData.preview ? (
                            <img src={formData.preview} className="preview-img" alt="Preview" />
                        ) : (
                            <p className="info-text">Escolha uma imagem</p>
                        )}
                    </div>

                    <button
                        type="button"
                        className="btn-img"
                        onClick={() => document.getElementById("inputImage").click()}
                    >
                        Alterar imagem
                    </button>

                    <input
                        id="inputImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />

                    {formData.imageName && (
                        <p className="image__selected">Imagem selecionada: {formData.imageName}</p>
                    )}
                </div>

                {/* PRIMEIRA COLUNA */}
                <div className="form__column">
                    <div className="form__nameProduct">
                        <label htmlFor="name__product">Nome do Produto</label>
                        <input
                            type="text"
                            id="name__product"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </div>

                    <div className="form__priceProduct">
                        <label htmlFor="price__product">Valor do Produto</label>
                        <input
                            type="text"
                            id="price__product"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({ ...formData, price: e.target.value })
                            }
                        />
                    </div>

                    <div className="form__sellerName">
                        <label htmlFor="seller__name">Nome do Vendedor</label>
                        <input
                            type="text"
                            id="seller__name"
                            value={formData.sellerName}
                            onChange={(e) =>
                                setFormData({ ...formData, sellerName: e.target.value })
                            }
                        />
                    </div>
                </div>

                {/* SEGUNDA COLUNA */}
                <div className="form__column">
                    <div className="form__descriptionProduct">
                        <label htmlFor="description__product">Descrição</label>
                        <input
                            type="text"
                            id="description__product"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="form__currencyValue">
                        <label htmlFor="currency__value">Moeda:</label>
                        <select
                            id="currency__value"
                            value={formData.currency}
                            onChange={(e) =>
                                setFormData({ ...formData, currency: e.target.value })
                            }
                        >
                            <option value="R$">R$</option>
                            <option value="$">$</option>
                            <option value="£">£</option>
                        </select>
                    </div>

                    <div className="form__sellerNumber">
                        <label htmlFor="seller__number">Número do Vendedor</label>
                        <input
                            type="text"
                            id="seller__number"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>
            </div>

            {!isSaved ? (
                <button type="submit" className="btn-addProduct">
                    Salvar Alterações
                </button>
            ) : (
                <Link className="add-product" to="/">
                    Voltar para Produtos
                </Link>
            )}
        </form>
    );
}
