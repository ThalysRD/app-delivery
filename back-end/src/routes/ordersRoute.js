const express = require('express');

const ordersController = require('../controllers/ordersController');

const ordersRoute = express.Router();

ordersRoute.get('/:id', ordersController.getOrders);
ordersRoute.get('/seller/:id', ordersController.getOrdersSeller);
ordersRoute.get('/details/:id', ordersController.getOrderDetails);
ordersRoute.post('/delivered/:id', ordersController.orderDelivered);
ordersRoute.post('/preparing/:id', ordersController.orderPreparing);
ordersRoute.post('/ontheway/:id', ordersController.orderOnTheWay);

module.exports = ordersRoute;
