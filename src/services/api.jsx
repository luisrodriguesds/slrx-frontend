import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
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
export const getUser = () => api.get('/user/token');
export const getUserById = (id) => api.get('/user/show?id='+id);
export const getUsers = (page=1) => api.get('/user/index?page='+page);
export const searchUsers = (filter) => api.get('/user/filter?filter='+filter);
export const filterUsers = (filter, page=null, perPage=null) => api.get('/user/filterby?filter='+filter+'&page='+page+'&perPage='+perPage);
export const deleteUser = (id) => api.delete('/user/delete?id='+id);
export const deleteUserAll = (array) => api.delete('/user/delete-all', { data: { array } });
export const sendPicture = (form, config) => api.post('/user/picture', form, config);

export const getProfessorStudant = (studant_id, professor_id=null) => api.get('/professor-studant/show?studant_id='+studant_id+'&professor_id='+professor_id);
export const postPedding = (id) => api.post('/user/pedding?id='+id);

//Menu
export const getMenu = () => api.get('/menu/show');

//AccessLevel
export const getAccessLevel = () => api.get('/access-level/index');

//Solicitations
export const getGap = () => api.get('/gap');
export const getEquipment = () => api.get('/equipment');
export const postSolicitation = (data) => api.post('/solictation', data);
export const getSolicitation = ({page}) => api.get('/solictation/all?page='+page);
export const searchSolicitation = (filter) => api.get('/solictation/filter?filter='+filter);
export const searchSolicitationByUser = (filter, id) => api.get('/solictation/filter/user?filter='+filter+'&user_id='+id);
export const filterhSolicitation = (filter) => api.get('/solictation/filterby?filter='+filter);
export const showSolicitation = (name) => api.get('/solictation/show/'+name);
export const editSolicitation = (data) => api.put('/solictation/update/', data);
export const destroySolicitation = (name) => api.delete('/solictation/destroy/'+name);
export const destroyAllSolicitation = (array) => api.delete('/solictation/destroy-all', { data: { array } });
export const nextStepSolicitation = (id) => api.post('/solictation/next-step', {id});
export const nextStepSolicitationFiveToSex = (form, config) => api.post('/solictation/next-step', form, config);
export const nextStepAllSolicitation = (array) => api.post('/solictation/next-step-all', {array});
export const propostaSolicitation = (data) => api.get('/solictation/proposta?data='+data);

export const getHead = () => api.get('/solictation/head-dash');

//Documents
export const postProposta = (data) => api.post('/documents/proposta', data);
export const getProposta = (user_id) => api.get('/documents/proposta?user_id='+user_id);
export const deleteProposta = (id) => api.delete('/documents/proposta?id='+id);

//Envio de email
export const postEmail = (data) => api.post('/documents/email', data);

//Professor Aluno
export const storeProfessorStudant = (email) => api.post('/professor-studant/store', {email});

//Useful files
export const getUsefulFiles = () => api.get('/useful-files');
export const postUsefulFiles = (form, config) => api.post('/useful-files', form, config);
export const putUsefulFiles = (form, config, id) => api.put('/useful-files/'+id, form, config);
export const showUsefulFiles = (id) => api.get('/useful-files/show/'+id);
export const deleteUsefulFiles = (id) => api.delete('/useful-files/destoy/'+id);



export default api;