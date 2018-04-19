const SharedData = require('./shared.data');

class LabelData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }

  createLabel(LabelObject) {
    try {
      const result = this.Model
        .create({
          name: LabelObject.getName(),
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateLabel(LabelId, LabelObject) {
    try {
      const result = this.Model.update({
        name: LabelObject.getName(),
      }, {
        where: {
          id: LabelId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LabelData;
