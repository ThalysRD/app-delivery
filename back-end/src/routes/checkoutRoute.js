const express = require('express');
const { tokenValidation } = require('../middlewares/tokenValidation');

const checkoutController = require('../controllers/checkoutController');

const checkoutRoute = express.Router();

checkoutRoute.post('/', tokenValidation, checkoutController.newSale);

module.exports = checkoutRoute;
