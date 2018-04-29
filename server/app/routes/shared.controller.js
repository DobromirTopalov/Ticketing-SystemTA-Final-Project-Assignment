const Validator = require('./validator');

class SharedController extends Validator {
  constructor(data, Model) {
    super(data, Model);
    this.data = data;
    this.Model = Model;
  }

  getAll() {
    return async (req, res, next) => {
      const info = await this.data[this.Model].getAll();

      return res.status(200).send({
        info,
      });
    };
  }

  // works not only for one, but other params too depending on route params
  getByParameter() {
    return async (req, res, next) => {
      console.log(req.params);
      const info = await this.data[this.Model].getByParam(req.params);

      try {
        if (!info) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        info,
      });
    };
  }

  // works not only for one, but other params too depending on route params
  getAllByParameter() {
    return async (req, res, next) => {
      const info = await this.data[this.Model].getAllByParam(req.params);

      try {
        if (!info) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        info,
      });
    };
  }
}

module.exports = SharedController;
