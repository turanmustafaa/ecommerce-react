import axios from 'axios';

const api = axios.create({
  baseURL: 'https://5fc9346b2af77700165ae514.mockapi.io/'
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
