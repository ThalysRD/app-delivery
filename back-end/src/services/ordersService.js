require('dotenv').config();
const { Sale, SaleProduct, Product, User } = require('../database/models');

const getOrders = async (id, seller = false) => {
  if (seller) { return Sale.findAll({ where: { sellerId: id } }); }
  return Sale.findAll({ where: { userId: id } }); 
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

const orderStatusUpdate = async (orderId, status) => {
 const [order] = await Sale.update({
    status,
  }, {
    where: { id: orderId },
  });
  if (order === 1) return status;
};

module.exports = { getOrders, getOrderDetails, orderStatusUpdate };
