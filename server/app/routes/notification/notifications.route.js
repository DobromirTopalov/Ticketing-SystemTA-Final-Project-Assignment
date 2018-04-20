const {
  Router,
} = require('express');

const NotificationController = require('./notifications.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new NotificationController(data);

  router
    .get('/api/notifications', controller.getNotifications())
    .get('/api/notifications/:id', controller.getById())
    .get('/api/notifications/user/:UserId', controller.getByUserId());

  app.use('/', router);
};

module.exports = {
  init,
};
