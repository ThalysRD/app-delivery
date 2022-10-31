const express = require('express');

const productController = require('../controllers/productController');
const { tokenValidation } = require('../middlewares/tokenValidation');

const productRoute = express.Router();

productRoute.get('/', productController.getAll);

module.exports = productRoute;