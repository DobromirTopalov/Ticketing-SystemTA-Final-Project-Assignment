const SharedData = require('./shared.data');

const {
  Commentary,
  User,
  Ticket,
} = require('../../../database/models');

class CommentaryData extends SharedData {
  constructor(Model) {
    super(Commentary, [User, Ticket]);
  }
}

module.exports = CommentaryData;
