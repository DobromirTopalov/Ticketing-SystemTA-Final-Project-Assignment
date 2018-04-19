'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Labels', [{
      name: 'High priority',
    }, {
      name: 'Moderate priority',
    }, {
      name: 'Low priority',
    }, {
      name: 'Organizational',
    }, {
      name: 'Optional',
    }].map( (el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Labels', null, {});
  },
};
