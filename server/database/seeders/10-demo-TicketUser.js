'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TicketUser', [{
      UserId: 4,
      TicketId: 4,
    }, {
      UserId: 6,
      TicketId: 4,
    }, {
      UserId: 6,
      TicketId: 6,
    }, {
      UserId: 5,
      TicketId: 6,
    }, {
      UserId: 7,
      TicketId: 4,
    }, {
      UserId: 9,
      TicketId: 1,
    }, {
      UserId: 10,
      TicketId: 1,
    }, {
      UserId: 13,
      TicketId: 7,
    }].map((el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TicketUser', null, {});
  },
};
