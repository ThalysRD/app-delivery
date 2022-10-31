const checkoutService = require('../services/checkoutService');

const newSale = async (req, res) => {
  const newSale = await checkoutService.newSale(req.body);
  return res.status(201).json({ newSale });
};

module.exports = { newSale };
