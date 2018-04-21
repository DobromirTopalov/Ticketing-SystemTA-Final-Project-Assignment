const SharedData = require('./shared.data');

const {
  User,
  Company,
  Role,
} = require('../../../database/models');

class UserData extends SharedData {
  constructor(Model) {
    super(User, [Company, Role]);
  }
}

module.exports = UserData;
