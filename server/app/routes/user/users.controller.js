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
      this.data.users.update(validObj, { email: validObj.email });

      // return created object to api
      return res.status(200).send({
        validObj,
      });
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
      this.data.users.delete(validObj, { email: validObj.email });

      // return created object to api
      return res.status(200).send({
        validObj,
      });
    };
  }
}

module.exports = UsersController;
