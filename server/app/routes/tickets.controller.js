class TicketController {
  constructor(data) {
    this.data = data;
  }

  getTickets() {
    return async (req, res, next) => {
      const tickets = await this.data.tickets.getAll();

      return res.status(401).send({
        tickets,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const tickets = await this.data.tickets.getTicket(+req.params.id, this.data.users);

      return res.status(401).send({
        tickets,
      });
      // return tickets;
    };
  }
}

module.exports = TicketController;
