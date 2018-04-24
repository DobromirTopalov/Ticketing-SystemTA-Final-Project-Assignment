const express = require('express');
const app = express();

const data = require('./data');
const config = require('./config');

require('./config/express').init(app);
require('./routes').init(app, data);


const passport = require('passport');
const strategy = require('./config/jwt-strategy');
passport.use('jwt', strategy.create());
passport.use('jwt-admin', strategy.createAdmin());

app.get('/test', passport.authenticate('jwt-admin', {
  session: false,
}), (req, res) => {
  res.send({
    authenticated: true,
  });
});

app.listen(config.PORT, () => console
  .log(`Server is running on localhost port: ${config.PORT}!`));
