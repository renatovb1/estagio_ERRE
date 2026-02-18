import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

// Se houver token guardado, adiciona Authorization automaticamente.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});