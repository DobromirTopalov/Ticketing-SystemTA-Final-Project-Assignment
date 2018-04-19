'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [{
      name: 'COMPLETED',
    }, {
      name: 'IN PROGRESS',
    }, {
      name: 'NOT STARTED',
    }, {
      name: 'ALMOST DONE',
    }, {
      name: 'REOPENED',
    }].map( (el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {});
  },
};
