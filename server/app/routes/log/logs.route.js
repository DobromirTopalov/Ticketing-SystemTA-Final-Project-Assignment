const {
  Router,
} = require('express');

const LogController = require('./logs.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new LogController(data);

  router
    .get('/api/logs', controller.getLogs())
    .get('/api/logs/:id', controller.getById())
    .get('/api/logs/user/:UserId', controller.getByUserId())
    .get('/api/logs/ticket/:TicketId', controller.getByTicketId());

  app.use('/', router);
};

module.exports = {
  init,
};
