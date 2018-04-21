const SharedData = require('./shared.data');

class StatusData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }
}

module.exports = StatusData;
