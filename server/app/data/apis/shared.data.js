// TO DO: delete require at some point of development if not used
const {
  User,
  Ticket,
  Company,
  Role,
  Status,
  Label,
  Team,
} = require('../../../database/models');

class SharedData {
  constructor(Model, includes = []) {
    this.Model = Model;
    this.includes = includes;
  }

  getAll() {
    const result = this.Model.findAll({
      include: this.includes,
      // raw: true,
    });

    return result;
  }

  getById(SomeId) {
    const result = this.Model.findOne({
      where: {
        id: SomeId,
      },
      include: this.includes,
      // raw: true,
    });

    return result;
  }
}

module.exports = SharedData;
