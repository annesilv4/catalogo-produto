import './header.css';
import logo from '../../assets/catalogoProdutos-logo.png';

export function Header() {
    return (
        <header className='header__catalogo'>
            <img src={logo} className='' alt="" />
        </header>
    )
}