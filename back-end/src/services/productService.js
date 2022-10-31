// require('dotenv').config();
// const jwt = require('jsonwebtoken');
const { Product } = require('../database/models');

const getAll = async () => {
  // console.log(Product);
  const products = await Product.findAll();

  return products;
};

module.exports = { getAll };
