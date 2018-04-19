'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Logs', [{
        changes: 'Label',
        wasRead: false,
        UserId: 5,
        TicketId: 4,
      }, {
        changes: 'Label',
        wasRead: false,
        UserId: 6,
        TicketId: 6,
      }, {
        changes: 'Status',
        wasRead: false,
        UserId: 4,
        TicketId: 6,
      }, {
        changes: 'Comment',
        wasRead: false,
        UserId: 5,
        TicketId: 6,
      }, {
        changes: 'Status',
        wasRead: false,
        UserId: 9,
        TicketId: 1,
      }, {
        changes: 'Status',
        wasRead: false,
        UserId: 10,
        TicketId: 1,
      }].map( (el) => {
        el.updatedAt = new Date;
        el.createdAt = new Date;
        return el;
      }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Logs', null, {});
  },
};
