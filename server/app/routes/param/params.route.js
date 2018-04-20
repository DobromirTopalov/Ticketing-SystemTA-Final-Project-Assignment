const {
  Router,
} = require('express');

// This is controller for Labels, Statuses, Roles models
const ParamController = require('./params.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new ParamController(data);

  router
    .get('/api/statuses', controller.getParam('statuses'))
    .get('/api/labels', controller.getParam('labels'))
    .get('/api/roles', controller.getParam('roles'));

  app.use('/', router);
};

module.exports = {
  init,
};
