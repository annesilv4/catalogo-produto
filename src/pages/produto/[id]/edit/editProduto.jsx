import './editProduto.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listarProdutos } from '../../../../api/apiProduto';
import { FormEditProduto } from '../../../../components/formEditProduto/formEditProduto';

export function EditProduto() {
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarProduto() {
            try {
                const response = await listarProdutos(); // retorna TODOS os produtos
                const lista = response.data;

                const produtoEncontrado = lista.find(
                    (item) => String(item._id) === String(id)
                );

                setProduto(produtoEncontrado);
            } catch (error) {
                console.error("Erro ao carregar produto", error);
            } finally {
                setLoading(false);
            }
        }

        carregarProduto();
    }, [id]);

    if (loading) {
        return <h1 className="editProduto__title">Carregando...</h1>;
    }

    if (!produto) {
        return <h1 className="editProduto__title">Produto não encontrado</h1>;
    }

    return (
        <>
            <h1 className='editProduto__title'>
                Editando Produto - {produto.nome}
            </h1>

            <FormEditProduto produto={produto} />
        </>
    );
}
