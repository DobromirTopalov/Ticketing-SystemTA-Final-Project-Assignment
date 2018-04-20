class NotificationController {
  constructor(data) {
    this.data = data;
  }

  getNotifications() {
    return async (req, res, next) => {
      const notifications = await this.data.notifications.getAll();

      return res.status(200).send({
        notifications,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const notifications = await this.data.notifications.getAll();
      const notification = notifications.find((x) => x.id === +req.params.id);

      try {
        if (!notification) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        notification,
      });
    };
  }

  getByUserId() {
    return async (req, res, next) => {
      const notifications = await this.data.notifications.getAll();
      const notification = notifications.filter((x) =>
                                              x.UserId === +req.params.UserId);

      try {
        if (!notification) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }
      return res.status(200).send({
        notification,
      });
    };
  }

  getByTicketId() {
    return async (req, res, next) => {
      const notifications = await this.data.notifications.getAll();
      const notification = notifications.filter((x) =>
                                          x.TicketId === +req.params.TicketId);

      try {
        if (!notification) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        notification,
      });
    };
  }
}

module.exports = NotificationController;
