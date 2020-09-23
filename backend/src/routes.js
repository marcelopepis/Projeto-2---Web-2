const express = require('express');
const routes = express.Router();
const SessionController = require('./controllers/SessionController');


routes.post('/sessions', SessionController.store);

routes.get('/sessions', SessionController.findUser);


module.exports = routes;