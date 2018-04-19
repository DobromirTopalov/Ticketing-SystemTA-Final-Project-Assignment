const SharedData = require('./shared.data');

class TicketUserData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }

  createTicketUser(TicketUserObject, TicketId, UserId) {
    try {
      const result = this.Model
        .create({
          TicketId: TicketId,
          UserId: UserId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateTicketUser(TicketUserObject, TicketId, UserId) {
    try {
      const result = this.Model.update({
        TicketId: TicketId,
        UserId: UserId,
      }, {
        where: {
          TicketId: TicketId,
          UserId: UserId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketUserData;
