const {
  Router,
} = require('express');

const CommentaryController = require('./commentaries.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new CommentaryController(data);

  router
    .get('/api/commentaries', controller.getCommentaries())
    .get('/api/commentaries/:id', controller.getById())
    .get('/api/commentaries/user/:UserId', controller.getByUserId())
    .get('/api/commentaries/ticket/:TicketId', controller.getByTicketId());

  app.use('/', router);
};

module.exports = {
  init,
};
