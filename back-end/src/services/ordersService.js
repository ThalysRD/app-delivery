require('dotenv').config();
const { Sale, SaleProduct, Product, User } = require('../database/models');

const getOrders = async (userId) => {
  const orders = await Sale.findAll({ where: { userId } });
  return orders;
};

const getOrderDetails = async (saleId) => {
  const orderDetails = await Sale.findOne({ 
    where: { id: saleId },
    include: [{
      model: User,
    }] });
  const orderProducts = await SaleProduct.findAll({
    where: { saleId },
    include: [{
      model: Product,
    }],
  });
  return { orderDetails, orderProducts };
};

module.exports = { getOrders, getOrderDetails };
