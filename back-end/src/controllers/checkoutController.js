const checkoutService = require('../services/checkoutService');

const newSale = async (req, res) => {
  const sale = await checkoutService.newSale(req.body);
  return res.status(201).json({ sale });
};

module.exports = { newSale };
