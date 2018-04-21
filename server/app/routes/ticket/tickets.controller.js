const SharedController = require('../shared.controller');

class TicketController extends SharedController {
  constructor(data) {
    super(data, 'tickets');
    this.data = data;
  }
}

module.exports = TicketController;
