import { useState } from "react";
import "./formProduto.css";
import { Link } from "react-router-dom";
import { adicionarProduto } from "../../api/apiProduto";

export function FormNewProduto() {
    const [isSaved, setIsSaved] = useState(false);

    // DADOS DO PRODUTO
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState("R$");
    const [phone, setPhone] = useState("");

    // PARA PRÉ-VISUALIZAÇÃO
    const [preview, setPreview] = useState(null);

    // Nome da imagem real
    const [imageName, setImageName] = useState("");


    // --- PRÉ-VISUALIZAÇÃO E CAPTURA DO NOME DO ARQUIVO ---
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));  // mostra a imagem
            setImageName(file.name);               // pega automaticamente o nome da imagem
        }
    }


    // --- MÁSCARA DE TELEFONE ---
    const formatPhone = (value) => {
        if (!value) return "";
        value = value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            value = value.replace(/(\d{0,2})/, "($1");
        }
        return value;
    };

    const handlePhoneChange = (e) => {
        setPhone(formatPhone(e.target.value));
    };


    // --- ENVIO DO FORMULÁRIO ---
    async function handleSubmit(e) {
        e.preventDefault();

        if (!imageName) {
            alert("Escolha uma imagem antes de cadastrar!");
            return;
        }

        const produto = {
            imagem: `/produtos/${imageName}`, // caminho da imagem dentro de public/produtos
            nome: name,
            descricao: description,
            preco: price,
            vendendor: sellerName,
            telefone: phone,
            moeda: currency
        };

        try {
            await adicionarProduto(produto);
            alert("Produto cadastrado com sucesso!");
            setIsSaved(true);
        } catch (erro) {
            console.error("Erro ao cadastrar Produto", erro);
            alert("Falha ao cadastrar produto!");
        }
    }


    return (
        <form className="newProduto__form" onSubmit={handleSubmit}>
            <div className="form__top">

                {/* IMAGEM */}
                <div className="form__image">
                    <p className="image__text">Imagem do Produto</p>

                    <div className="image__box">
                        {preview ? (
                            <img src={preview} className="preview-img" alt="Preview" />
                        ) : (
                            <p className="info-text">Escolha uma imagem</p>
                        )}
                    </div>

                    <button
                        type="button"
                        className="btn-img"
                        onClick={() => document.getElementById('inputImage').click()}
                    >
                        Selecionar imagem
                    </button>

                    <input
                        id="inputImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />

                    {imageName && (
                        <p className="image__selected">Imagem selecionada: {imageName}</p>
                    )}
                </div>


                {/* PRIMEIRA COLUNA */}
                <div className="form__column">
                    <div className="form__nameProduct">
                        <label htmlFor="name__product" className="name__product">Nome do Produto</label>
                        <input
                            type="text"
                            id="name__product"
                            className="input__nameProduct"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form__priceProduct">
                        <label htmlFor="price__product" className="price__product">Valor do Produto</label>
                        <input
                            type="text"
                            id="price__product"
                            className="input__priceProduct"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form__sellerName">
                        <label className="seller__name" htmlFor="seller__name">Nome do Vendedor</label>
                        <input
                            type="text"
                            id="seller__name"
                            className="input__sellerName"
                            value={sellerName}
                            onChange={(e) => setSellerName(e.target.value)}
                        />
                    </div>
                </div>


                {/* SEGUNDA COLUNA */}
                <div className="form__column">
                    <div className="form__descriptionProduct">
                        <label htmlFor="description__product" className="description__product">Descrição</label>
                        <input
                            type="text"
                            id="description__product"
                            className="input__descriptionProduct"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form__currencyValue">
                        <label className="currency__value" htmlFor="currency__value">Moeda:</label>
                        <select id="currency__value" className="select__currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <option value="R$">R$</option>
                            <option value="$">$</option>
                            <option value="£">£</option>
                        </select>
                    </div>

                    <div className="form__sellerNumber">
                        <label htmlFor="seller__number" className="seller__number">Número do Vendedor</label>
                        <input
                            type="text"
                            id="seller__number"
                            className="input__sellerNumber"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>
            </div>


            {!isSaved ? (
                <button type="submit" className="btn-addProduct">Adicionar Produto</button>
            ) : (
                <Link className="add-product" to="/">Ir para Produtos</Link>
            )}
        </form>
    );
}