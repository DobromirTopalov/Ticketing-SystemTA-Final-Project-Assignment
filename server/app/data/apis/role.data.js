const SharedData = require('./shared.data');

class RoleData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }
}

module.exports = RoleData;
