const bcrypt = require('bcrypt-nodejs');
const uuid = require('uuid/v4');
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('./../../config');

class AuthController {
  constructor(data) {
    this.data = data;
  }

  getUsers() {
    return async (req, res, next) => {
      const usersFound = await this.data.users.getAll();

      return res.status(401).send({
        usersFound,
      });
    };
  }

  login() {
    return async (req, res, next) => {
      let userFound = await this.data.users.getAll().map((element) => element.dataValues);
      userFound = userFound.find((x) => x.email === req.body.email);

      if (userFound) {
        bcrypt.compare(req.body.password, userFound.password, (err, response) => {
          if (response) {
            const expire = moment(new Date()).add(config.JWT_EXPIRE_TIME, 'seconds').unix();
            const payload = {
              sub: userFound.id,
              email: userFound.email,
              password: userFound.password,
              exp: expire,
              iss: config.JWT_ISS,
            };

            const secret = config.JWT_SECRET;

            const token = jwt.encode(payload, secret);

            res.status(200).send({
              token: token,
            });
          }
        });
      } else {
        return res.status(401).send({
          err: 'User already exist',
        });
      }
    };
  }

  register() {
    return async (req, res) => {
      let userFound = await this.data.users.getAll().map((element) => element.dataValues);
      userFound = userFound.find((x) => x.email === req.body.email);

      if (!userFound) {
        const user = {
          id: uuid(),
          email: req.body.email,
          password: '',
        };
        bcrypt.hash(req.body.password, null, null, async (err, hash) => {
          user.password = hash;
          const userFound2 = await this.data.users.createUser(user, 3, 1);
          console.log(userFound2);
        });


        res.status(200).send({});
      } else {
        res.status(401).send({
          err: 'User already exist',
        });
      }
    };
  }
}

module.exports = AuthController;
