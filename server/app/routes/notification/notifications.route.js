const passport = require('passport');
const {
  Router,
} = require('express');

const NotificationController = require('./notifications.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new NotificationController(data);

  router
    .get('/api/notifications', passport.authenticate('jwt', {
      session: false,
    }), controller.getAll())

    .get('/api/notifications/:id', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/notifications/user/:UserId', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
