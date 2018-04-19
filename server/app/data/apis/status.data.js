const SharedData = require('./shared.data');

class StatusData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }

  createStatus(StatusObject) {
    try {
      const result = this.Model
        .create({
          name: StatusObject.getName(),
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateStatus(StatusId, StatusObject) {
    try {
      const result = this.Model.update({
        name: StatusObject.getName(),
      }, {
        where: {
          id: StatusId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StatusData;
