'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Commentaries', [{
      content: 'This task is very hard!',
      date: '10.02.18 03:20',
      UserId: 5,
      TicketId: 6,
    }, {
      content: 'I would like to talk to the requester!',
      date: '10.02.18 03:21',
      UserId: 5,
      TicketId: 6,
    }, {
      content: 'STFU Bastard! I\'ll kill ya!',
      date: '17.02.18 05:21',
      UserId: 6,
      TicketId: 6,
    }, {
      content: 'Will someone help me with a bug',
      date: '11.02.18 17:27',
      UserId: 5,
      TicketId: 6,
    }, {
      content: 'Nice job!',
      date: '12.12.18 23:13',
      UserId: 5,
      TicketId: 4,
    }, {
      content: 'Did you try to plug-out and back plug-in?',
      date: '15.12.18 08:59',
      UserId: 5,
      TicketId: 4,
    }].map((el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Commentaries', null, {});
  },
};
