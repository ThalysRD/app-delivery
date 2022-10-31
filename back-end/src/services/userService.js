require('dotenv').config();
const fs = require('fs/promises');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const jwtKey = 'jwt.evaluation.key';

const checkEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (newUser) => {
  const { email, password, name, role } = newUser;
  await User.create({ name, email, password: md5(password), role });
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, await fs.readFile(jwtKey, 'utf-8'), jwtConfig);
  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users.map((user) => {
    const result = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image, 
    };
    return result;
  });
};

const getByUserId = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return undefined;
  }
  const result = {
    id: user.id,
    displayName: user.displayName,
    email: user.email,
    image: user.image,
  };
  return result;
};

const deleteMe = async (email) => {
  const user = await checkEmail(email);
  const { id } = user;
  await User.destroy(
    { where: { id } },
  );
  return undefined;
};
 
module.exports = { checkEmail, createUser, getAllUsers, getByUserId, deleteMe };
