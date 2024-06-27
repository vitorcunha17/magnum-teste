import axios from "axios";

const api = axios.create({
  // para rodar localmente
  baseURL: "http://localhost:3001",
  // para rodar na vercel
  // baseURL: "https://magnum-teste-api.vercel.app",
});

export default api;
