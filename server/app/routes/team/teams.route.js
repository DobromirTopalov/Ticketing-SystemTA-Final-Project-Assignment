const { Router } = require('express');

const TeamController = require('./teams.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TeamController(data);

  router
  .get('/api/teams', controller.getAll())
  .get('/api/teams/:id', controller.getByParameter())
  .get('/api/teams/name/:name', controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
