const ordersService = require('../services/ordersService');

const getOrders = async (req, res) => {
  const orders = await ordersService.getOrders(req.body.userId);
  return res.status(201).json(orders);
};

const getOrderDetails = async (req, res) => {
  const order = await ordersService.getOrderDetails(req.params.id);
  return res.status(201).json(order);
};

const orderDelivered = async (req, res) => {
  await ordersService.orderDelivered(req.params.id);
  return res.status(204);
};

module.exports = { getOrders, getOrderDetails, orderDelivered };