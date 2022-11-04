const express = require('express');
const { tokenValidation } = require('../middlewares/tokenValidation');

const loginController = require('../controllers/loginController');

const loginRoute = express.Router();

loginRoute.post('/', loginController.userLogin);
loginRoute.get('/validate', tokenValidation, loginController.loginValidate);

module.exports = loginRoute;
