const SharedController = require('../shared.controller');

class CompanyController extends SharedController {
  constructor(data) {
    super(data, 'companies');
    this.data = data;
  }

  updateCompany() {
    return async (req, res, next) => {
      const result = await this.data.companies.update(req.body, { id: +req.body.id });

      // return created object to api
      return res.status(200).send({
        result,
      });
    };
  }

  createCompany() {
    return async (req, res, next) => {
      const result = await this.data.companies.findOrCreate(req.body);

      // return created object to api
      return res.status(200).send({
        result,
      });
    };
  }
}

module.exports = CompanyController;
