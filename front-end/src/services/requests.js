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
  console.log(sellerId);

  return [
    {
      deliveryAddress: 'endereço',
      deliveryNumber: '9',
      id: 1,
      saleDate: new Date('1995-11-17T03:24:00'),
      sellerId: 2,
      status: 'Pendente',
      totalPrice: 25.00,
      userId: 3,
    },
    {
      deliveryAddress: 'endereço-bolado',
      deliveryNumber: '543',
      id: 2,
      saleDate: new Date('1995-12-17T03:24:00'),
      sellerId: 2,
      status: 'Pendente',
      totalPrice: 25.00,
      userId: 3,
    },
  ];
};

export default api;
