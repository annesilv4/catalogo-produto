import './newProduto.css';
import { Link } from 'react-router-dom';

export function NewProduto() {
    return (
        <>
        <h1 className='newProduto__title'>Cadastramento de Produtos</h1>
        <div className='Produto__Link'>
            <Link to="/" className="btn__produto">
                Voltar para Produtos
            </Link>
        </div>
        </>
    );
}
