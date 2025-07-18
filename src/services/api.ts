// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // A URL base da nossa API Rails
});

// Isso é um "Interceptor". Ele intercepta TODAS as requisições antes de serem enviadas.
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Se temos um token, adicionamos ele ao cabeçalho Authorization
    config.headers.Authorization = token;
  }
  return config;
});

export default api;