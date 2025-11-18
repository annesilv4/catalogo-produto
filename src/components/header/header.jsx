import './header.css';
import logoProduto from '../../assets/catalogoProdutos-logo.png';

export function Header() {
    return (
        <header className='header__catalogo'>
            <img src={logoProduto} alt="" />
        </header>
    )
}