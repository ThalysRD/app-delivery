const ordersService = require('../services/ordersService');

const getOrders = async (req, res) => {
  const orders = await ordersService.getOrders(Number(req.params.id));
  return res.status(200).json(orders);
};

const getOrdersSeller = async (req, res) => {
  const orders = await ordersService.getOrders(Number(req.params.id), true);
  return res.status(200).json(orders);
};

const getOrderDetails = async (req, res) => {
  const order = await ordersService.getOrderDetails(req.params.id);
  return res.status(200).json(order);
};

const orderDelivered = async (req, res) => {
  const result = await ordersService.orderStatusUpdate(req.params.id, 'Entregue');
  return res.status(200).json({ status: result });
};

const orderPreparing = async (req, res) => {
  const result = await ordersService.orderStatusUpdate(req.params.id, 'Preparando');
  return res.status(200).json({ status: result });
};

const orderOnTheWay = async (req, res) => {
  const result = await ordersService.orderStatusUpdate(req.params.id, 'Em Trânsito');
  return res.status(200).json({ status: result });
};

module.exports = { 
  getOrders, 
  getOrderDetails,
  orderDelivered,
  getOrdersSeller,
  orderPreparing,
  orderOnTheWay, 
};
