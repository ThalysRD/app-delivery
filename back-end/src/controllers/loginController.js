const loginService = require('../services/loginService');

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  const token = await loginService.userLogin(email, password);
  if (!token) {
    return res.status(404).json({ message: 'Invalid fields' });
  }
  return res.status(200).json(token);
};

const loginValidate = async (req, res) => {
  const email = req.user.data;
  const role = await loginService.loginValidate(email);
  return res.status(200).json({ role });
};

module.exports = { userLogin, loginValidate };
