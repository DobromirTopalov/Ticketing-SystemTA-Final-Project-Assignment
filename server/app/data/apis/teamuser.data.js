const SharedData = require('./shared.data');

class TeamUserData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }
}

module.exports = TeamUserData;
