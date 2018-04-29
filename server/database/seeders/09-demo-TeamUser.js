'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TeamUsers', [{
      UserId: 2,
      TeamId: 1,
    }, {
      UserId: 6,
      TeamId: 4,
    }, {
      UserId: 7,
      TeamId: 4,
    }, {
      UserId: 5,
      TeamId: 4,
    }, {
      UserId: 4,
      TeamId: 4,
    }, {
      UserId: 10,
      TeamId: 1,
    }, {
      UserId: 9,
      TeamId: 1,
    }].map((el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TeamUsers', null, {});
  },
};
