const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('./../../config');

class AuthController {
  constructor(data) {
    this.data = data;
  }

  login() {
    return async (req, res, next) => {
      const user = await this.data.users.getByParam({
        email: req.body.email,
      });

      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, response) => {
          if (response) {
            const expire = moment(new Date())
                            .add(config.JWT_EXPIRE_TIME, 'seconds').unix();

            const payload = {
              id: user.id,
              email: user.email,
              exp: expire,
              iss: config.JWT_ISS,
              role: user.Role.name,
            };

            const secret = config.JWT_SECRET;
            const token = jwt.encode(payload, secret);

            res.status(200).send({
              token: token,
            });
          }
        });
      } else {
        res.status(401).send({
          err: 'Access denied!',
        });
      }
    };
  }

  register() {
    return async (req, res) => {
      const foundUser = await this.data.users.getByParam({
        email: req.body.email,
      });

      const company = await this.data.companies.getByParam({
        name: req.body.company,
      });

      const role = await this.data.companies.getByParam({
        name: req.body.role,
      });
      // TO DO: fix register form/models/logic
      if (!foundUser) {
        const user = {
          firstName: req.body.firstName || 'FirstName',
          lastName: req.body.lastName || 'LastName',
          CompanyId: req.body.company || 1,
          RoleId: req.body.role || 6,
          email: req.body.email || 'default@mail.com',
          password: req.body.password || '123123',
        };
        bcrypt.hash(req.body.password, null, null, async (err, hash) => {
          user.password = hash;
          await this.data.users.findOrCreate(user);
        });

        res.status(200).send({});
      } else {
        res.status(401).send({
          err: 'User already exist!',
        });
      }
    };
  }
}

module.exports = AuthController;
