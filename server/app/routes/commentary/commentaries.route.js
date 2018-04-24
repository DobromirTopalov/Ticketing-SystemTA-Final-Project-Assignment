const passport = require('passport');
const {
  Router,
} = require('express');

const CommentaryController = require('./commentaries.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new CommentaryController(data);

  router
    .get('/api/commentaries', passport.authenticate('jwt', {
      session: false,
    }), controller.getAll())

    .get('/api/commentaries/:id', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/commentaries/user/:UserId', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/commentaries/ticket/:TicketId', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
