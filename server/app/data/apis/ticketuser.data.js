const SharedData = require('./shared.data');

const {
  TicketUser,
  Ticket,
  User,
} = require('../../../database/models');
class TicketUserData extends SharedData {
  constructor(Model) {
    super(TicketUser);
  }
}

module.exports = TicketUserData;
