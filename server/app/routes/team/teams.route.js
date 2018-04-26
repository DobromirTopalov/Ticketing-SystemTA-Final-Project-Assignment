const passport = require('passport');
const { Router } = require('express');

const TeamController = require('./teams.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TeamController(data);

  router
  .get('/api/teams', passport.authenticate('jwt', {
    session: false,
  }), controller.getAll())

  .get('/api/teams/:id', passport.authenticate('jwt', {
    session: false,
  }), controller.getByParameter())

  .get('/api/teams/name/:name', passport.authenticate('jwt', {
    session: false,
  }), controller.getByParameter())

  .post('/api/teams/:id', passport.authenticate('jwt', {
    session: false,
  }), controller.addUserToTeam())

  .post('/api/teams/:id/leave', passport.authenticate('jwt', {
    session: false,
  }), controller.userLeaveTeam());

  app.use('/', router);
};

module.exports = {
  init,
};
