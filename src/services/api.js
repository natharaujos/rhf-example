import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const createSession = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const getClient = async (id) => {
  id = id || "";
  return api.get(`/clientes/${id}`);
};

export const addClient = async (client) => {
  return api.post(`/clientes`, client);
};

export const deleteClient = async (id) => {
  return api.delete(`/clientes/${id}`);
};

export const editClient = async (id, client) => {
  return api.put(`/clientes/${id}`, client);
};

export const getLivro = async (id) => {
  id = id || "";
  return api.get(`/livros/${id}`);
};

export const addLivro = async (livro) => {
  return api.post(`/livros`, livro);
};

export const deleteLivro = async (id) => {
  return api.delete(`/livros/${id}`);
};

export const editLivro = async (id, livro) => {
  return api.put(`/livros/${id}`, livro);
};

export const addEmprestimo = async (emprestimo) => {
  return api.post(`/emprestimos`, emprestimo);
};

export const getEmprestimo = async (id) => {
  id = id || "";
  return api.get(`/emprestimos/${id}`);
};

export const setEmprestimo = async (emprestimo) => {
  return api.put(`/emprestimos`, emprestimo);
};

export const deleteEmprestimo = async (id) => {
  return api.delete(`/emprestimos/${id}`);
};

export const getUsers = async () => {
  return api.get(`/usuarios`);
};
