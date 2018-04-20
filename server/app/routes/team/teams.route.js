const { Router } = require('express');

const TeamController = require('./teams.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TeamController(data);

  router
  .get('/api/teams', controller.getTeams())
  .get('/api/teams/:id', controller.getById())
  .get('/api/teams/:name', controller.getByName());

  app.use('/', router);
};

module.exports = {
  init,
};
