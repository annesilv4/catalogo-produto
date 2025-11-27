import { useRef, useState } from "react";
import "./formProduto.css";
import { Link } from "react-router-dom";
import { adicionarProduto } from "../../api/apiProduto"; // IMPORTANDO FUNÇÃO DE API

export function FormNewProduto() {
    const [preview, setPreview] = useState(null);
    const [info, setInfo] = useState("Tamanho: - 3:4 Formato: - .png, .jpg");
    const [hasImage, setHasImage] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    // Verificar se o produto foi cadastrado
    const [isSaved, setIsSaved] = useState(false);

    // DADOS DO PRODUTO
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState("R$");
    const [phone, setPhone] = useState("");

    const inputRef = useRef();

    // Função para remover imagem
    const removeImage = () => {
        setPreview(null);
        setInfo("Tamanho: - 3:4  Formato: - .png, .jpg");
        setHasImage(false);
    };

    // Lidar cliques no botão
    const handleButtonClick = () => {
        if (!hasImage) {
            // Não tem imagem -> adicionar nova
            inputRef.current.click();
            return;
        }

        if (!removeMode) {
            // 1° clique -> remover
            removeImage();
            setRemoveMode(true);
            return;
        }

        if (removeMode) {
            // 2° clique -> escolher nova
            setRemoveMode(false);
            inputRef.current.click();
        }
    };

    // Quando a imagem é selecionada
    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const width = img.width;
            const height = img.height;

            // calcular razão
            const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
            const divisor = gcd(width, height);
            const ratioW = width / divisor;
            const ratioH = height / divisor;

            setPreview(img.src);
            setInfo(`Tamanho: ${width}x${height}px | Formato: ${ratioW}:${ratioH}`);
            setHasImage(true);
            setRemoveMode(false);
        };
    };

    // Função para formatar o número de telefone
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
    }

    const handlePhoneChange = (e) => {
        setPhone(formatPhone(e.target.value));
    }

    // FUNCIONALIDADE DO FORMULARIO
    async function handleSubmit(e) {
        e.preventDefault();

        if (!preview) {
            alert("Por favor, adicione uma imagem");
            return;
        }

        const produto = {
            imagem: preview,
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
        <form action="" className="newProduto__form" onSubmit={handleSubmit}>
            <div className="form__top">
                <div className="form__image">
                    <label className="image__text">Imagem do Produto</label>
                    <div className="newProduto__img">
                        <div className="image__box">

                            {/* Imagem por cima do texto */}
                            {preview && (
                                <img className="preview-img" src={preview} alt="preview" />
                            )}

                            {/* Texto só aparece quando NÃO tem imagem */}
                            {!preview && <span className="info-text">{info}</span>}

                            <button
                                type="button"
                                className="btn-img"
                                onClick={handleButtonClick}
                            >
                                {hasImage ? (removeMode ? "Trocar Imagem" : "Remover Imagem") : "Adicionar Imagem"}
                            </button>
                        </div>

                        <input type="file" ref={inputRef} accept="image/*" onChange={handleChange} hidden />
                    </div>
                </div>

                <div className="form__column">
                    <div className="form__nameProduct">
                        <label htmlFor="name__product" className="name__product">Nome do Produto</label>
                        <input type="text" id="name__product" className="name__input" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form__priceProduct">
                        <label htmlFor="price__product" className="price__product">Valor do Produto</label>
                        <input type="text" id="price__product" className="price__input" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className="form__sellerName">
                        <label htmlFor="seller__name" className="seller__name">Nome do Vendendor</label>
                        <input type="text" id="seller__name" className="sellerName__input" value={sellerName} onChange={(e) => setSellerName(e.target.value)} />
                    </div>
                </div>

                <div className="form__column">
                    <div className="form__descriptionProduct">
                        <label htmlFor="description__product" className="description__product">Descrição do Produto</label>
                        <input type="text" id="description__product" className="description__input" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div className="form__currencyValue">
                        <label htmlFor="currency__value" className="currency__value">Moeda:</label>
                        <select id="currency__valueOptions" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                            <option value="R$">R$</option>
                            <option value="$">$</option>
                            <option value="£">£</option>
                        </select>
                    </div>

                    <div className="form__sellerNumber">
                        <label htmlFor="seller__number" className="seller__number">Número do Vendendor</label>
                        <input type="text" id="seller__number" className="sellerNumber__input" value={phone} onChange={handlePhoneChange} />
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