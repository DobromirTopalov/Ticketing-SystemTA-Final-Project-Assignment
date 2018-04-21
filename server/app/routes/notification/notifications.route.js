const {
  Router,
} = require('express');

const NotificationController = require('./notifications.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new NotificationController(data);

  router
    .get('/api/notifications', controller.getAll())
    .get('/api/notifications/:id', controller.getByParameter())
    .get('/api/notifications/user/:UserId', controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
