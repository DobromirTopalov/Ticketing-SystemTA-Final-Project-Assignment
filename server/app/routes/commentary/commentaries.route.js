const {
  Router,
} = require('express');

const CommentaryController = require('./commentaries.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new CommentaryController(data);

  router
    .get('/api/commentaries', controller.getAll())
    .get('/api/commentaries/:id', controller.getByParameter())
    .get('/api/commentaries/user/:UserId', controller.getByParameter())
    .get('/api/commentaries/ticket/:TicketId', controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
