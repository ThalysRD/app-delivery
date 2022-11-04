const ordersService = require('../services/ordersService');

const getOrders = async (req, res) => {
  const orders = await ordersService.getOrders(Number(req.params.id));
  return res.status(201).json(orders);
};

const getOrderDetails = async (req, res) => {
  const order = await ordersService.getOrderDetails(req.params.id);
  return res.status(201).json(order);
};

const orderDelivered = async (req, res) => {
  const result = await ordersService.orderDelivered(req.params.id);
  return res.status(200).json( {status: result} );
};

module.exports = { getOrders, getOrderDetails, orderDelivered };
