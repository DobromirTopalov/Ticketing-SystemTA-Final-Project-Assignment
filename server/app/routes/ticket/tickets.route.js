const passport = require('passport');
const { Router } = require('express');

const TicketController = require('./tickets.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TicketController(data);

  router
  .get('/api/tickets', passport.authenticate('jwt', {
    session: false,
  }), controller.getAll())

  .get('/api/tickets/:id', passport.authenticate('jwt', {
    session: false,
  }), controller.getByParameter())

  .post('/api/tickets/:id', passport.authenticate('jwt', {
    session: false,
  }), controller.updateTicket());
  app.use('/', router);
};

module.exports = {
  init,
};
