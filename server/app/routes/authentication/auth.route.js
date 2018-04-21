const { Router } = require('express');
const AuthController = require('./auth.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new AuthController(data);

  router
  .post('/api/register', controller.register())
  .post('/api/login', controller.login());

  app.use('/', router);
};

module.exports = {
  init,
};
