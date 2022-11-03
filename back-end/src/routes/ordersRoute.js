const express = require('express');

const ordersController = require('../controllers/ordersController');

const ordersRoute = express.Router();

ordersRoute.get('/:id', ordersController.getOrders);
ordersRoute.get('/details/:id', ordersController.getOrderDetails);

module.exports = ordersRoute;
