const SharedData = require('./shared.data');

class CompanyData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }
}

module.exports = CompanyData;
