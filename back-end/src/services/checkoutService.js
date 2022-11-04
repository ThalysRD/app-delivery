require('dotenv').config();
const moment = require('moment/moment');
const { Sale, SaleProduct } = require('../database/models');

const addSale = async (saleInfo) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = saleInfo;
  console.log(sellerId);
  const sale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: moment().format(),
    status: 'Pendente',
  });
  return sale;
};

const addSaleProducts = async (products, saleId) => {
  const productsList = products.map((product) => {
    const obj = {
      saleId,
      productId: product.id,
      quantity: product.quantity,
    };
    return obj;
  });
  await SaleProduct.bulkCreate(productsList);
};

const newSale = async (saleInfo) => {
  const sale = await addSale(saleInfo);
  const saleId = sale.id;
  await addSaleProducts(saleInfo.products, saleId);
  return sale.id;
};

module.exports = { newSale };
