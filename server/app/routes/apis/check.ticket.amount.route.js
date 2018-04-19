const {
  Router,
} = require('express');

const TicketController = require('./check.ticket.amount.controller');

const init = (app, data) => {
  const router = new Router();
  const controller = new TicketController(data);

  router
    .get('/checkTicketsAmount', async (req, res, next) => {
      if (!req.user) {
        return res.redirect('/login');
      }

      const eventId = req.query.EventId;
      const amount = req.query.amount;

      let product;

      try {
        const eventInfo = await controller.getEventInfo(eventId);
        if (eventInfo === null) {
          throw new Error('There is no such a Event!');
        }

        const ticketInfo = await controller.getTicketInfo(eventId);
        if (ticketInfo === null) {
          throw new Error('There is no such a Ticket!');
        }

        const ticketCapacity = ticketInfo.capacity;
        if (ticketCapacity - amount < 0) {
          throw new Error('All tickets were sold out!');
        }

        product = {
          infoEvent: eventInfo,
          infoTicket: ticketInfo,
          amount: amount,
        };
      } catch (err) {
        res.status(400).json({ 'err': err.message });
      }

      return res.status(200).json(product);
    });

  app.use('/event', router);
};

module.exports = {
  init,
};
