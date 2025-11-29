import axios from "axios";

const apiProduct =
  "https://crudcrud.com/api/469ad53ebf774a908350e934b901a1c8/produto";

export async function listarProdutos() {
  return axios.get(apiProduct);
}

export async function adicionarProduto(dados) {
  return axios.post(apiProduct, dados);
}

export async function editarProduto(id, dados) {
  const { _id, ...resto } = dados;
  return axios.put(`${apiProduct}/${id}`, resto);
}

export async function excluirProduto(id) {
  return axios.delete(`${apiProduct}/${id}`);
}
