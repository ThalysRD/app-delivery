import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const requestRegister = async (body) => {
  const { data } = await api.post('/register', body);
  return data;
};

export const getOrderDetails = async (id) => {
  const { data } = await api.get(`/orders/details/${id}`);
  return data;
};

export const requestCheckout = async (body) => {
  const { data } = await api.post('/checkout', body);
  return data;
};

export const requestSeller = async () => {
  const { data } = await api.get('/register/sellers');
  return data;
};

export const orderDelivered = async (id) => {
  const { data } = await api.post(`/orders/delivered/${id}`);
  return data;
};

export const requestOrders = async (body) => {
  const { userId } = body;
  const { data } = await api.get(`/orders/${userId}`);
  return data;
};

export const loginValidate = async () => {
  const { data } = await api.get('/login/validate');
  return data;
};

export const requestSellerOrders = async (body) => {
  const { sellerId } = body;
  const { data } = await api.get(`/orders/seller/${sellerId}`);
  return data;
};

export default api;
