import api from './apiConfig';

export const getProducts = () => {
  return api.get('/products');
};
