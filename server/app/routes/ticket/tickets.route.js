const passport = require('passport');
const { Router } = require('express');

const TicketController = require('./tickets.controller');
const TicketUserController = require('./ticketuser.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TicketController(data);
  const controller2 = new TicketUserController(data);

  router
  .get('/api/tickets', controller.getAll())
  // .get('/api/tickets', passport.authenticate('jwt', {
  //   session: false,
  // }), controller.getAll())

  .get('/api/tickets/:id', passport.authenticate('jwt', {
    session: false,
  }), controller.getByParameter())

  .get('/api/tickets/users/:TicketId', passport.authenticate('jwt', {
    session: false,
  }), controller2.getAllByParameter())

  .post('/api/tickets/create', passport.authenticate('jwt', {
    session: false,
  }), controller.createTicket())

  .post('/api/tickets/participate', passport.authenticate('jwt', {
    session: false,
  }), controller2.addTicketUser())

  .post('/api/tickets/departicipate', passport.authenticate('jwt', {
    session: false,
  }), controller2.removeTicketUser())

  .post('/api/tickets/:id', passport.authenticate('jwt', {
    session: false,
  }), controller.updateTicket());

  app.use('/', router);
};

module.exports = {
  init,
};
