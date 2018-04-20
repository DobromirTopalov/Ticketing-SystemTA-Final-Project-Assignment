const { Router } = require('express');

const TicketController = require('./tickets.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TicketController(data);

  router
  .get('/api/tickets', controller.getTickets())
  .get('/api/tickets/:id', controller.getById());
  // .post('/api/teams', controller.createTeams());

  app.use('/', router);
};

module.exports = {
  init,
};
