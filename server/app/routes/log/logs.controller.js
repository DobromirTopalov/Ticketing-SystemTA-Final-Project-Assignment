const SharedController = require('../shared.controller');

class LogController extends SharedController {
  constructor(data) {
    super(data, 'logs');
    this.data = data;
  }
}

module.exports = LogController;
