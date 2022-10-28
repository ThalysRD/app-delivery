require('dotenv').config();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const userLogin = async (email, password) => {
  const user = await User.findOne({ where: { email, password: md5(password) } });
  if (!user) {
    return null;
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);
  return { token, role: user.role };
};

module.exports = { userLogin };