import axios from 'axios';

export const doLogin = (user) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, user);
};

export const createUser = (user) => {
  return axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/add`, user, {
    headers: {
      Authorization: sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  });
};
