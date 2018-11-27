import axios from 'axios';

const api = axios.create({
  baseURL: 'https://atom-stew.glitch.me/',
});

api.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default api;
