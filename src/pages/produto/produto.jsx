import './produtos.css';
import { Link } from "react-router-dom";
import { listarProdutos, excluirProduto } from '../../api/apiProduto';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../components/loading/loading';

export function Produto() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true); // <--- ESTADO DE LOADING

    const carregarProdutos = useCallback(async () => {
        setLoading(true);
        try {
            const start = Date.now();
            const request = await listarProdutos();

            const MIN_TIME = 1500;
            const elapsed = Date.now() - start;
            const delay = MIN_TIME - elapsed;

            if (delay > 0) {
                await new Promise(res => setTimeout(res, delay));
            }

            setProdutos(request.data);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
        setLoading(false);
    }, []); // <- sem dependências, sem warning, sem loop

    useEffect(() => {
        carregarProdutos();
    }, [carregarProdutos]);


    async function handleDelete(id) {
        setLoading(true); // mostra loading

        try {
            await excluirProduto(id);
            await carregarProdutos(); // recarrega lista
        } catch (error) {
            console.error("Erro ao excluir:", error);
        }
    }


    // 🔥 AQUI FICA O IF DO LOADING
    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <h1 className='produto__title'>Nossos Produtos</h1>

            <div className="newProduto__link">
                <Link to="/newProduto" className="btn__cadastrar">
                    Cadastrar Produto
                </Link>
            </div>

            <div className='produto__cards'>
                {produtos.length > 0 ? (
                    produtos.map((p) => (
                        <div key={p._id} className='produto__card'>
                            <div className='produto__img'>
                                <img src={p.imagem} alt="" />
                            </div>
                            <h3 className='product__name'>{p.nome}</h3>
                            <p className='product__description'>{p.descricao}</p>
                            <p className='product__price'>{p.moeda} {p.preco}</p>
                            <p className='product__seller'>Vendedor: {p.vendendor}</p>
                            <p className='product__phone'>Telefone: {p.telefone}</p>

                            <div className='product__actions'>
                                <Link className='edit__product' to={`/produto/${p._id}/edit`}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>

                                <button className='delete__product' onClick={() => handleDelete(p._id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='result__empty'>Nenhum produto cadastrado</p>
                )}
            </div>
        </>
    );
}
