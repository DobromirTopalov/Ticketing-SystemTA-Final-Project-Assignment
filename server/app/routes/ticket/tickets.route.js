const { Router } = require('express');

const TicketController = require('./tickets.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TicketController(data);

  router
  .get('/api/tickets', controller.getAll())
  .get('/api/tickets/:id', controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
