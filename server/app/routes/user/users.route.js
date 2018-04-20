const {
  Router,
} = require('express');

const UsersController = require('./users.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new UsersController(data);

  router
    .get('/api/users', controller.getUsers())
    .get('/api/users/:email', controller.getByEmail());

  app.use('/', router);
};

module.exports = {
  init,
};
