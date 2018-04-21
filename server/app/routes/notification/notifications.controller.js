const SharedController = require('../shared.controller');

class NotificationController extends SharedController {
  constructor(data) {
    super(data, 'notifications');
    this.data = data;
  }
}

module.exports = NotificationController;
