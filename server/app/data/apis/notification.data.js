const SharedData = require('./shared.data');

const {
  Notification,
  User,
} = require('../../../database/models');

class NotificationData extends SharedData {
  constructor(Model) {
    super(Notification, [User]);
  }
}

module.exports = NotificationData;
