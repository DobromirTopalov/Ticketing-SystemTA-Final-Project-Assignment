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
      paranoid: true,
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
      paranoid: true,
      // raw: true,
    });

    return result;
  }

  getByParam(paramModel) {
    return this.Model.findOne({
      where: paramModel,
      include: this.includes,
      paranoid: true,
      // raw: true,
    });
  }

  getAllByParam(paramModel) {
    return this.Model.findAll({
      where: paramModel,
      include: this.includes,
      paranoid: true,
      // raw: true,
    });
  }

  create(modelObj) {
    return this.Model.create(modelObj);
  }

  findOrCreate(modelObj) {
    return this.Model.findCreateFind({
      where: modelObj,
      paranoid: true,
    });
  }

  update(modelObj, paramObj) {
    return this.Model.update(modelObj, {
      where: paramObj,
      paranoid: true,
    });
  }

  delete(modelObj) {
    return this.Model.destroy({
      where: modelObj,
      paranoid: true,
    });
  }

  hardDelete(modelObj) {
    return this.Model.destroy({
      where: modelObj,
    });
  }
}

module.exports = SharedData;
