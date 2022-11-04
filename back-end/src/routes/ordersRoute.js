const express = require('express');

const ordersController = require('../controllers/ordersController');

const ordersRoute = express.Router();

ordersRoute.get('/', ordersController.getOrders);
ordersRoute.get('/:id', ordersController.getOrderDetails);
ordersRoute.post('/delivered/:id', ordersController.orderDelivered);

module.exports = ordersRoute;
