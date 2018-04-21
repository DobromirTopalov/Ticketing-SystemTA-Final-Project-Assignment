const SharedData = require('./shared.data');

class TicketUserData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }
}

module.exports = TicketUserData;
