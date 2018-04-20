// This is controller for Labels, Statuses, Roles models

class ParamController {
  constructor(data) {
    this.data = data;
  }

  getParam(param) {
    return async (req, res, next) => {
      const result = await this.data[param].getAll();

      return res.status(200).send({
        result,
      });
    };
  }
}

module.exports = ParamController;
