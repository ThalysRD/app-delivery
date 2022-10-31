require('dotenv').config();
const fs = require('fs/promises');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const jwtKey = 'jwt.evaluation.key';

const userLogin = async (email, password) => {
  const user = await User.findOne({ where: { email, password: md5(password) } });
  if (!user) {
    return null;
  }
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, await fs.readFile(jwtKey, 'utf-8'), jwtConfig);
  return {
    token,
    role: user.role,
    name: user.name,
    email: user.email, 
  };
};

module.exports = { userLogin };
