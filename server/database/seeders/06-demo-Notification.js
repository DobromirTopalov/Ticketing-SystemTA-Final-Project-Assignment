'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notifications', [{
      name: 'Invitation',
      content: 'You\'re invited in a new team!',
      NotificationImgUrl: 'somePhoto.jpg',
      date: '09.12.18',
      wasRead: false,
      UserId: 5,
    }, {
      name: 'New member joined team',
      content: 'Member \'Stilian Martinov\' has joined team #2144',
      NotificationImgUrl: 'somePhoto.jpg',
      date: '08.08.18',
      wasRead: false,
      UserId: 6,
    }, {
      name: 'New Ticket in team',
      content: 'Created ticket in your team',
      NotificationImgUrl: 'somePhoto.jpg',
      date: '14.02.18',
      wasRead: true,
      UserId: 7,
    }, {
      name: 'Ticket assigned to you',
      content: 'You\'re assigned a ticket #2345',
      NotificationImgUrl: 'somePhoto.jpg',
      date: '11.07.18',
      wasRead: true,
      UserId: 5,
    }].map((el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notifications', null, {});
  },
};
