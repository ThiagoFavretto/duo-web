import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro nao tratado:", error.response?.data || error.message);
    const message =
      error.response?.data?.erro ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Erro inesperado";
    alert(message);
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const codigoJogador = localStorage.getItem("codigoJogador");

  if (codigoJogador) {
    config.headers["codigoJogador"] = codigoJogador;
  }

  return config;
});
