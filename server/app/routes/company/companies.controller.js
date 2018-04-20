class CompanyController {
  constructor(data) {
    this.data = data;
  }

  getCompanies() {
    return async (req, res, next) => {
      const companies = await this.data.companies.getAll();

      return res.status(200).send({
        companies,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const companies = await this.data.companies.getAll();
      const company = companies.find((x) => x.id === +req.params.id);

      try {
        if (!company) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        company,
      });
    };
  }

  getByName() {
    return async (req, res, next) => {
      const companies = await this.data.companies.getAll();
      const company = companies.find((x) => x.name === req.params.name);

      try {
        if (!company) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        company,
      });
    };
  }
}

module.exports = CompanyController;
