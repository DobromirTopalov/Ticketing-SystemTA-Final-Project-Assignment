const SharedData = require('./shared.data');

const {
  User,
  Ticket,
  Status,
  Label,
  Team,
} = require('../../../database/models');

class TicketData extends SharedData {
  constructor(Model) {
    super(Ticket, [User, Status, Label, Team,
                    { model: User, as: 'requesterId' },
                    { model: User, as: 'assigneeId' },
                    { model: User, as: 'escalationContactId' },
                  ]);
  }
}

module.exports = TicketData;
