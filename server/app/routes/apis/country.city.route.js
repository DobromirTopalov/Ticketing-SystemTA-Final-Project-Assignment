const {
  Router,
} = require('express');

const CountryCityController = require('./country.city.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new CountryCityController(data);

  router
    .get('/countries', async (req, res) => {
      const result = await controller.getAllCountries();

      res.status(200).json(result);
    })
    .get('/cities', async (req, res) => {
      const country = req.query.country;
      const result = await controller.getAllCities(country);

      if (result.length === 0) {
        return res.status(200).json({ info: false });
      }

      return res.status(200).json(result);
    })
    .get('/countryByName', async (req, res) => {
      const country = req.query.country;
      const result = await controller.getCountry(country);

      res.status(200).json(result);
    })
    .get('/cityByName', async (req, res) => {
      const city = req.query.city;
      const result = await controller.getCity(city);

      res.status(200).json(result);
    });

  app.use('/', router);
};

module.exports = {
  init,
};
