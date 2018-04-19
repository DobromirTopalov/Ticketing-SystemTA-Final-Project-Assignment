const SharedData = require('./shared.data');

class RoleData extends SharedData {
  constructor(Model) {
    super();
    this.Model = Model;
  }

  createRole(RoleObject) {
    try {
      const result = this.Model
        .create({
          name: RoleObject.getName(),
        });
      return result;
    } catch (error) {
      throw error;
    }
  }

  updateRole(RoleId, RoleObject) {
    try {
      const result = this.Model.update({
        name: RoleObject.getName(),
      }, {
        where: {
          id: RoleId,
        },
        raw: true,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RoleData;
