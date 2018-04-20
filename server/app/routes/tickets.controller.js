class TicketController {
  constructor(data) {
    this.data = data;
  }

  geTickets() {
    return async (req, res, next) => {
      const tickets = await this.data.tickets.getAll();

      return res.status(401).send({
        tickets,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const tickets = await this.data.tickets.getAll();
      const ticket = tickets.find((x) => x.id === +req.params.id);

      return res.status(401).send({
        ticket,
      });
    };
  }
}

module.exports = TicketController;
