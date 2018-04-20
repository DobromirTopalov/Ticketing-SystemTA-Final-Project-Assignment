const {
  Router,
} = require('express');

const CompanyController = require('./companies.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new CompanyController(data);

  router
    .get('/api/companies', controller.getCompanies())
    .get('/api/companies/:id', controller.getById())
    .get('/api/companies/:name', controller.getByName());

  app.use('/', router);
};

module.exports = {
  init,
};
