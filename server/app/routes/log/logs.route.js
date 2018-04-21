const {
  Router,
} = require('express');

const LogController = require('./logs.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new LogController(data);

  router
    .get('/api/logs', controller.getAll())
    .get('/api/logs/:id', controller.getByParameter())
    .get('/api/logs/user/:UserId', controller.getByParameter())
    .get('/api/logs/ticket/:TicketId', controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
