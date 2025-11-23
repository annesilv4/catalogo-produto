import './newProduto.css';
import { Link } from 'react-router-dom';
import { FormNewProduto } from '../../components/formProduto/formProduto';
export function NewProduto() {
    return (
        <>
            <h1 className='newProduto__title'>Cadastramento de Produtos</h1>
            <FormNewProduto />
        </>
    );
}
