const SharedController = require('../shared.controller');

class TicketController extends SharedController {
  constructor(data) {
    super(data, 'tickets');
    this.data = data;
  }

  updateTicket() {
    return async (req, res, next) => {
      const result = await this.data.tickets.update(req.body, { id: req.body.id });

      console.log(result);
      // return created object to api
      return res.status(200).send({
        result,
      });
    };
  }

  createTicket() {
    return async (req, res, next) => {
      const result = await this.data.tickets.findOrCreate(req.body);

      // return created object to api
      return res.status(200).send({
        result,
      });
    };
  }
}

module.exports = TicketController;
