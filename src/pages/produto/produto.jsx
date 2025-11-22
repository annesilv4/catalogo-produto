import './produtos.css';
import { Link } from "react-router-dom";

export function Produto() {
    return (
        <>
            <h1 className='produto__title'>Nossos Produtos</h1>
            <div className="newProduto__link">
                <Link to="/newProduto" className="btn__cadastrar">
                    Cadastrar Produto
                </Link>
            </div>
            <div className='produto__cards'></div>
        </>
    )
}