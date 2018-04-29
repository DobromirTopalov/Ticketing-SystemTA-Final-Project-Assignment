const SharedController = require('../shared.controller');

class TicketUserController extends SharedController {
  constructor(data) {
    super(data, 'ticketuser');
    this.data = data;
  }
}

module.exports = TicketUserController;
