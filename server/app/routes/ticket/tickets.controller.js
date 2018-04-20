class TicketController {
  constructor(data) {
    this.data = data;
  }

  getTickets() {
    return async (req, res, next) => {
      const ticket = await this.data.tickets.getAll();

      return res.status(200).send({
        ticket,
      });
    };
  }

  getById() {
    return async (req, res, next) => {
      const ticket = await this.data.tickets.getById(+req.params.id);
      try {
        if (!ticket) {
          throw new Error('Nothing found!');
        }
      } catch (error) {
        res.status(400).json({ 'error': error.message });
      }

      return res.status(200).send({
        ticket,
      });
    };
  }
}

module.exports = TicketController;
