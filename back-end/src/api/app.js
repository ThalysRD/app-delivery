const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(express.json());

app.use('/login', cors(), routes.loginRoute);
app.use('/register', cors(), routes.userRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
