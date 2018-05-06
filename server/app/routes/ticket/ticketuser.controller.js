const SharedController = require('../shared.controller');

class TicketUserController extends SharedController {
  constructor(data) {
    super(data, 'ticketuser');
    this.data = data;
  }

  addTicketUser() {
      return async (req, res, next) => {
      const obj = {
        TicketId: +req.body.TicketId,
        UserId: +req.body.UserId,
      };

      console.log(obj, 'BAAAAATEE');
      // const result = await this.data.ticketuser.create(obj);
      const result = await this.data.ticketuser.findOrCreate(obj);


      // return created object to api
      return await res.status(200).send({
        result,
      });
    };
  }

  removeTicketUser() {
    return async (req, res, next) => {
    const obj = await {
      TicketId: req.body.TicketId,
      UserId: req.body.UserId,
    };

    const result = await this.data.ticketuser.hardDelete(obj);

    // return created object to api
    return await res.status(200).send({
      result,
    });
  };
}
}
module.exports = TicketUserController;
