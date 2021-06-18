import axios from 'axios';
import {IConcert, IUserCredentials} from './interfaces';

// UNPROTECTED
export const logInAPI = async (data: IUserCredentials) => {
  return await axios.post('/users/login', data);
};
export const signUpAPI = async (data: IUserCredentials) => {
  return await axios.post('/users/signup', data);
};

const token = localStorage.getItem('token');

const instance = axios.create();
instance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
// PROTECTED
export const whoAmIAPI = async () => {
  return await instance.get('/whoAmI');
};
export const getConcertsAPI = async () => {
  return await instance.get(
    '/concerts?filter={%22include%22%3A%20[%22location%22,%22performer%22]}',
  );
};
export const addConcertAPI = async (data: IConcert) => {
  return await instance.post('/concerts', data);
};
export const editConcertAPI = async (data: IConcert) => {
  return await instance.patch(`/concerts/${data.id}`, data);
};
export const deleteConcertAPI = async (_id: string) => {
  return await instance.delete(`/concerts/${_id}`);
};
