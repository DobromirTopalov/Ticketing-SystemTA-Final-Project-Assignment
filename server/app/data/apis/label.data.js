const SharedData = require('./shared.data');

class LabelData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }
}

module.exports = LabelData;
