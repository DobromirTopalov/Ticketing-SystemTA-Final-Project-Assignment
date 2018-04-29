const passport = require('passport');
const {
  Router,
} = require('express');

const TeamController = require('./teams.controller');
const TeamUserController = require('./teamuser.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TeamController(data);
  const controller2 = new TeamUserController(data);

  router
    .get('/api/teams', passport.authenticate('jwt', {
      session: false,
    }), controller.getAll())

    .get('/api/teams/create', passport.authenticate('jwt', {
      session: false,
    }))

    .get('/api/teams/:id', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

  .get('/api/teams/users/:TeamId', passport.authenticate('jwt', {
    session: false,
  }), controller2.getAllByParameter())

  .get('/api/teams/usersId/:UserId', passport.authenticate('jwt', {
    session: false,
  }), controller2.getByParameter())

  .post('/api/teams/:id', passport.authenticate('jwt', {
    session: false,
  }), controller.addUserToTeam())
    .get('/api/teams/name/:name', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())


    .post('/api/teams/create', passport.authenticate('jwt', {
      session: false,
    }), controller.createTeam())

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
