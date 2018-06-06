const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('./../../config');

const SharedController = require('../shared.controller');

class UsersController extends SharedController {
  constructor(data) {
    super(data, 'users');
    this.data = data;
  }

  // CRUD TESTING - soft delete with paranoid tables

  createUser() {
    return async (req, res, next) => {
      // replace with req.body
      const obj = {
        name: 'Borko',
        name2: 'Porko',
        email: 'batko@mail.com',
        pass: '123456',
        role: 6,
      };

      // object validate info
      let validObj;
      try {
        validObj = {
          email: this.setEmail(obj.email),
          password: this.setPassword(obj.pass),
          firstName: this.setPersonName(obj.name),
          lastName: this.setPersonName(obj.name2),
          RoleId: (await this.data.roles.getById(obj.role)).id, // if relations
        };
      } catch (error) {
        return res.status(401).send(JSON.parse(`{"error": "${error}"}`));
      }

      // if validation passed - create/ update DB
      this.data.users.findOrCreate(validObj);

      // return created object to api
      return res.status(200).send({
        validObj,
      });
    };
  }

  updateUser() {
    return async (req, res, next) => {
      // replace with req.body
      const obj = {
        name: 'Mirko',
        name2: 'Porko',
        email: 'bateboiko.@mail.com',
        pass: '654321',
        role: 6,
      };

      // object validate info
      let validObj;
      try {
        validObj = {
          email: this.setEmail(obj.email),
          password: this.setPassword(obj.pass),
          firstName: this.setPersonName(obj.name),
          lastName: this.setPersonName(obj.name2),
          RoleId: (await this.data.roles.getById(obj.role)).id, // if relations
        };
      } catch (error) {
        return res.status(401).send(JSON.parse(`{"error": "${error}"}`));
      }

      // if validation passed - create/ update DB
      this.data.users.update(validObj, {
        email: validObj.email,
      });

      // return created object to api
      return res.status(200).send({
        validObj,
      });
    };
  }

  updateUser2() {
    return async (req, res, next) => {
      const foundUser = await this.data.users.getByParam({
        email: req.body.email,
      });

      if (foundUser) {
        const user = {
          firstName: req.body.firstName || 'FirstName',
          lastName: req.body.lastName || 'LastName',
          CompanyId: req.body.CompanyId,
          RoleId: req.body.RoleId || 6,
          email: req.body.emailNew || 'default@mail.com',
          password: req.body.password || foundUser.password,
        };
        bcrypt.hash(req.body.password, null, null, async (err, hash) => {
          user.password = hash;
          await this.data.users.update(user, { id: +req.body.id });
        });

        res.status(200).send({});
      } else {
        res.status(401).send({
          err: 'User already exist!',
        });
      }
    };
  }

  deleteUser() {
    return async (req, res, next) => {
      // replace with req.body
      const obj = {
        name: 'Borko',
        name2: 'Porko',
        email: 'batko@mail.com',
        pass: '123456',
        role: 6,
      };

      // object validate info
      let validObj;
      try {
        validObj = {
          email: this.setEmail(obj.email),
          password: this.setPassword(obj.pass),
          firstName: this.setPersonName(obj.name),
          lastName: this.setPersonName(obj.name2),
          RoleId: (await this.data.roles.getById(obj.role)).id, // if relations
        };
      } catch (error) {
        return res.status(401).send(JSON.parse(`{"error": "${error}"}`));
      }

      // if validation passed - create/ update DB
      this.data.users.delete(validObj, {
        email: validObj.email,
      });

      // return created object to api
      return res.status(200).send({
        validObj,
      });
    };
  }
}

module.exports = UsersController;
