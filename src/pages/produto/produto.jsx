import './produtos.css';
import { Link } from "react-router-dom";
import { listarProdutos, excluirProduto } from '../../api/apiProduto';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function Produto() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function carregarProdutos() {
            try {
                const request = await listarProdutos();
                setProdutos(request.data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }

        carregarProdutos();
    }, []);

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
                            <p className='product__seller'>Vendendor: {p.vendendor}</p>
                            <p className='product__phone'>Telefone: {p.telefone}</p>

                            <div className='product__actions'>
                                <Link className='edit__product' to={`/produto/${p._id}/edit`}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Link>

                                <button className='delete__product' onClick={() => excluirProduto(p._id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto cadastrado</p>
                )}
            </div>
        </>
    )
}