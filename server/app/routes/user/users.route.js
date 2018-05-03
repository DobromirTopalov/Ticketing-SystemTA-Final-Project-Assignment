const passport = require('passport');
const {
  Router,
} = require('express');

const UsersController = require('./users.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new UsersController(data);

  router
    .get('/api/users', controller.getAll())
    // .get('/api/users', passport.authenticate('jwt', {
    //   session: false,
    // }), controller.getAll())

    .get('/api/users/:email', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/users/id/:id', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/create/user', passport.authenticate('jwt', {
      session: false,
    }), controller.createUser())

    .get('/api/update/user', passport.authenticate('jwt', {
      session: false,
    }), controller.updateUser())

    .get('/api/delete/user', passport.authenticate('jwt', {
      session: false,
    }), controller.deleteUser());

    app.use('/', router);
};

module.exports = {
  init,
};
