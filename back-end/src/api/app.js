const express = require('express');
const routes = require('../routes');
var cors = require('cors')

const app = express();

app.use(express.json());

app.use('/login', cors(), routes.loginRoute)

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
