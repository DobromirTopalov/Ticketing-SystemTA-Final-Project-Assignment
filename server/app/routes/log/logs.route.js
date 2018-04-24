const passport = require('passport');
const {
  Router,
} = require('express');

const LogController = require('./logs.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new LogController(data);

  router
    .get('/api/logs', passport.authenticate('jwt', {
      session: false,
    }), controller.getAll())

    .get('/api/logs/:id', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/logs/user/:UserId', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/logs/ticket/:TicketId', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
