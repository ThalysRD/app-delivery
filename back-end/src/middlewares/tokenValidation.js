const jwt = require('jsonwebtoken');
const fs = require('fs/promises');

const jwtKey = 'jwt.evaluation.key';

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    console.log(req.headers);
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validation = jwt.verify(token, await fs.readFile(jwtKey, 'utf-8'));
    req.user = validation;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
};

module.exports = { tokenValidation };