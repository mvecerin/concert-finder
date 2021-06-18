import axios from 'axios';
import {IConcert, IUserCredentials} from './interfaces';

const url = 'http://localhost:5000';

// UNPROTECTED
export const logInAPI = async (data: IUserCredentials) => {
  return await axios.post(`${url}/users/login`, data);
};
export const signUpAPI = async (data: IUserCredentials) => {
  return await axios.post(`${url}/users/signup`, data);
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
  return await instance.get(`${url}/whoAmI`);
};
export const getConcertsAPI = async () => {
  return await instance.get(
    `${url}/concerts?filter={%22include%22%3A%20[%22location%22,%22performer%22]}`,
  );
};
export const addConcertAPI = async (data: IConcert) => {
  return await instance.post(`${url}/concerts`, data);
};
export const editConcertAPI = async (data: IConcert) => {
  return await instance.patch(`${url}/concerts/${data.id}`, data);
};
export const deleteConcertAPI = async (_id: string) => {
  return await instance.delete(`${url}/concerts/${_id}`);
};
