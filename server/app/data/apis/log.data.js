const SharedData = require('./shared.data');

class LogData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }

  createLog(LogObject, UserId, TicketId) {
    try {
      const result = this.Model
        .create({
          changes: LogObject.getChanges(),
          wasRead: LogObject.getRead(),
          UserId: UserId,
          TicketId: TicketId,
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateLog(LogId, LogObject, UserId, TicketId) {
    try {
      const result = this.Model.update({
        changes: LogObject.getChanges(),
        wasRead: LogObject.getRead(),
        UserId: UserId,
        TicketId: TicketId,
      }, {
        where: {
          id: LogId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LogData;
