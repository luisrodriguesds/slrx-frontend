import api from './api';

export const TOKEN_KEY = "@slrx-Token";
export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  api.get('/user/logout');
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const user = async () => {
    const userToken = await api.get('/user/token');
    // console.log(userToken);
    if(userToken.data.error == true){
      logout();
      return null;
    }else{
      return userToken.data.user;
    }
};