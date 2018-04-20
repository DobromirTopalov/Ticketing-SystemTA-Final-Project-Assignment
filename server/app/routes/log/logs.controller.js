class LogController {
  constructor(data) {
    this.data = data;
  }

  getLogs() {
    return async (req, res, next) => {
      const logs = await this.data.logs.getAll();

      return res.status(200).send({
        logs,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const logs = await this.data.logs.getAll();
      const log = logs.find((x) => x.id === +req.params.id);

      try {
        if (!log) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        log,
      });
    };
  }

  getByUserId() {
    return async (req, res, next) => {
      const logs = await this.data.logs.getAll();
      const log = logs.filter((x) => x.UserId === +req.params.UserId);

      try {
        if (!log) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        log,
      });
    };
  }

  getByTicketId() {
    return async (req, res, next) => {
      const logs = await this.data.logs.getAll();
      const log = logs.filter((x) => x.TicketId === +req.params.TicketId);

      try {
        if (!log) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        log,
      });
    };
  }
}

module.exports = LogController;
