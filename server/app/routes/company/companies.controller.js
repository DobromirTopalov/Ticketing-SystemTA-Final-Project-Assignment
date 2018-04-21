const SharedController = require('../shared.controller');

class CompanyController extends SharedController {
  constructor(data) {
    super(data, 'companies');
    this.data = data;
  }
}

module.exports = CompanyController;
