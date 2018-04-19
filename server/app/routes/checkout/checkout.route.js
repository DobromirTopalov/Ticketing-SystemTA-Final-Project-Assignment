const {
  Router,
} = require('express');

const BillingController = require('./checkout.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new BillingController(data);

  router
    .get('/', async (req, res) => {
      if (!req.user) {
        return res.redirect('/login');
      }

      const context = await controller.checkOutData();

      return res.render('./checkout/checkout', context);
    })
    .post('/', async (req, res, next) => {
      if (!req.user) {
        res.status(400).json({ 'err': 'You need to be authenticated!' });
      }

      const usernameId = req.user.id;
      const billingData = req.body;

      const product = await controller.newPurches(usernameId, billingData);
      res.status(200).json(product);
    });

  app.use('/checkout', router);
};

module.exports = {
  init,
};
