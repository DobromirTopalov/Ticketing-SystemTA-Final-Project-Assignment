const passport = require('passport');
const {
  Router,
} = require('express');

const CompanyController = require('./companies.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new CompanyController(data);

  router
    .get('/api/companies', controller.getAll())

    .get('/api/companies/:id', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter())

    .get('/api/companies/:name', passport.authenticate('jwt', {
      session: false,
    }), controller.getByParameter());

  app.use('/', router);
};

module.exports = {
  init,
};
