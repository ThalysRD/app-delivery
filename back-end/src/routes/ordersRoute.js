const express = require('express');

const ordersController = require('../controllers/ordersController');

const ordersRoute = express.Router();

ordersRoute.get('/:id', ordersController.getOrders);
ordersRoute.get('/seller/:id', ordersController.getOrdersSeller);
ordersRoute.get('/details/:id', ordersController.getOrderDetails);
ordersRoute.get('/delivered/:id', ordersController.orderDelivered);
ordersRoute.get('/preparing/:id', ordersController.orderPreparing);
ordersRoute.get('/ontheway/:id', ordersController.orderOnTheWay);

module.exports = ordersRoute;
