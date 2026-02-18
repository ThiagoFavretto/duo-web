import { api } from "./api";

export async function comecarService(codigoSala: string) {
  const response = await api.get(`/game/comecar/${codigoSala}`);
  return response.data;
}

export async function entrarService(nick: string, codigoSala: string) {
  const response = await api.post("/game/entrar", { nick, codigoSala });
  return response.data;
}

export async function jogarCarta(codigoSala: string, carta: any) {
  const response = await api.post("/game/jogarCarta", { codigoSala, carta });
  return response.data;
}