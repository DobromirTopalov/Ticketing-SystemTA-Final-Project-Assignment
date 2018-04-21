const SharedData = require('./shared.data');

const {
  Log,
  User,
  Ticket,
} = require('../../../database/models');

class LogData extends SharedData {
  constructor(Model) {
    super(Log, [User, Ticket]);
  }
}

module.exports = LogData;
