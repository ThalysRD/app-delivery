require('dotenv').config();
const jwt = require('jsonwebtoken');
const moment = require('moment/moment');
const { Sale, SaleProduct } = require('../database/models');

const newSale = async (saleInfo) => {
  const sale = await addSale(saleInfo);
  const saleId = sale.id;
  await addSaleProducts(saleInfo.products, saleId);
  return sale.id;
};

const addSale = async (saleInfo) => {
  const { user_id, seller_id, total_price, delivery_address, delivery_number } = saleInfo;
  return await Sale.create({
    user_id,
    seller_id,
    total_price,
    delivery_address,
    delivery_number,
    sale_date: moment().format(),
    status: 'Pendente',
  })
};

const addSaleProducts = async (products, saleId) => {
  const productsList = products.map((product) => {
    const obj = {
      sale_id: saleId,
      product_id: product,
    };
    return obj;
  })
  await SaleProduct.bulkCreate(productsList);
};


 
module.exports = { newSale };
