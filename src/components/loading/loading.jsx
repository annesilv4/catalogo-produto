import "./loading.css";
import Logo from "../../assets/catalogoProduto-logoWhite.png";

export default function Loading() {
    return (
        <div className="loading-screen">
            <img src={Logo} alt="Logo em Preto e Branco" className="loading-logo" />

            <div className="loading-bar-container">
                <div className="loading-bar"></div>
            </div>
        </div>
    )
}