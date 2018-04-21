const {
  Router,
} = require('express');

const UsersController = require('./users.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new UsersController(data);

  router
    .get('/api/users', controller.getAll())
    .get('/api/users/:email', controller.getByParameter())
    .get('/api/create/user', controller.createUser())
    .get('/api/update/user', controller.updateUser())
    .get('/api/delete/user', controller.deleteUser());
  app.use('/', router);
};

module.exports = {
  init,
};
