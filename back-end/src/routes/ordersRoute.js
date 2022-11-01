const express = require('express');

const ordersController = require('../controllers/ordersController');

const ordersRoute = express.Router();

ordersRoute.get('/', ordersController.getOrders);
ordersRoute.get('/:id', ordersController.getOrderDetails);

module.exports = ordersRoute;
