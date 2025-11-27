import axios from "axios";

const apiProduct =
  "https://crudcrud.com/api/2f5e83d8b5e24dff8b4931f33d6af870/produto";

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
