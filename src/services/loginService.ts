import { api } from "./api";

export async function criarService(nick: string) {
  const response = await api.post("/login/criar", { nick });
  return response.data;
}

export async function entrarService(nick: string, codigoSala: string) {
  const response = await api.post("/login/entrar", { nick, codigoSala });
  return response.data;
}