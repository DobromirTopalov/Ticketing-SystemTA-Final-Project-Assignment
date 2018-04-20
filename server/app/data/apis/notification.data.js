const SharedData = require('./shared.data');

const {
  Notification,
  User,
} = require('../../../database/models');

class NotificationData extends SharedData {
  constructor(Model) {
    super(Notification, [User]);
  }

  createNotification(NotificationObject, UserId) {
    try {
      const result = this.Model
        .create({
          name: NotificationObject.getName(),
          content: NotificationObject.getContent(),
          NotificationImgUrl: NotificationObject.getImg(),
          wasRead: NotificationObject.getRead(),
          date: NotificationObject.getDate(),
          UserId: UserId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateNotification(NotificationId, NotificationObject, UserId) {
    try {
      const result = this.Model.update({
        name: NotificationObject.getName(),
        content: NotificationObject.getContent(),
        NotificationImgUrl: NotificationObject.getImg(),
        wasRead: NotificationObject.getRead(),
        date: NotificationObject.getDate(),
        UserId: UserId,
      }, {
        where: {
          id: NotificationId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NotificationData;
