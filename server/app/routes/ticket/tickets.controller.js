const SharedController = require('../shared.controller');

class TicketController extends SharedController {
  constructor(data) {
    super(data, 'tickets');
    this.data = data;
  }

  updateTicket() {
    return async (req, res, next) => {
      const result = await this.data.tickets.update(req.body, { id: req.body.id });
      const obj1 = {
        TicketId: +req.body.id,
        UserId: +req.body.AssigneeId,
      };

      const obj2 = {
        TicketId: +req.body.id,
        UserId: +req.body.RequesterId,
      };

      const restoreDeleted1 = await this.data.ticketuser.restore(obj1);
      let user1 = restoreDeleted1;
      if (!restoreDeleted1) {
        user1 = await this.data.ticketuser.findOrCreate(obj1);
      }

      const restoreDeleted2 = await this.data.ticketuser.restore(obj2);
      let user2 = restoreDeleted2;
      if (!restoreDeleted2) {
        user2 = await this.data.ticketuser.findOrCreate(obj2);
      }

      // return created object to api
      return res.status(200).send({
        result,
        user1,
        user2,
      });
    };
  }

  createTicket() {
    return async (req, res, next) => {
      const result = await this.data.tickets.findOrCreate(req.body);
      const obj1 = {
        TicketId: +result[0].id,
        UserId: +result[0].AssigneeId,
      };

      const obj2 = {
        TicketId: +result[0].id,
        UserId: +result[0].RequesterId,
      };

      const restoreDeleted1 = await this.data.ticketuser.restore(obj1);
      let user1 = restoreDeleted1;
      if (!restoreDeleted1) {
        user1 = await this.data.ticketuser.findOrCreate(obj1);
      }

      const restoreDeleted2 = await this.data.ticketuser.restore(obj2);
      let user2 = restoreDeleted2;
      if (!restoreDeleted2) {
        user2 = await this.data.ticketuser.findOrCreate(obj2);
      }


      // return created object to api
      return res.status(200).send({
        result,
        user1,
        user2,
      });
    };
  }
}

module.exports = TicketController;
