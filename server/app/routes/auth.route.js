const { Router } = require('express');
const passport = require('passport');

const AuthController = require('./auth.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new AuthController(data);

  router
  .get('/test', passport.authenticate('jwt', {
    session: false,
  }), (req, res) => {
    console.log('before res');
    res.send({
      authenticated: true,
    });
  })
  .post('/api/register', controller.register())
  .post('/api/login', controller.login());

  app.use('/', router);
};

module.exports = {
  init,
};
