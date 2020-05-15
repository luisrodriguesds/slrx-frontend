import api from './api';

export const TOKEN_KEY = "@slrx-Token";
export const USER_KEY = "@slrx-User";
export const isAuthenticated = () => {
  return localStorage.getItem(TOKEN_KEY) !== null
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  api.get('/user/logout');
  localStorage.setItem(TOKEN_KEY, token);
};

export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const setUser = user => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const user = async () => {
    const userToken = await api.get('/user/token');
    // console.log(userToken);
    if(userToken.data.error === true){
      logout();
      return null;
    }else{
      return userToken.data.user;
    }
};

export const signInAPI = async (data) => {
  try {
    const response = await api.post('/user/auth', data)
    return response.data
  } catch (error) {
    if (error.response === 401) {
      return {...error.response.data[0], error:true}
    }    
  }
}