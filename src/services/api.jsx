import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333/api"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//User
export const userLogin = (auth) => api.post('/user/auth', auth);
export const userRegister = (register) => api.post('/user', register);
export const userUpdate = (update) => api.put('/user', update);
export const changePass = (update) => api.put('/user/change-pass', update);

//Menu
export const getMenu = () => api.get('/menu/show');


export default api;