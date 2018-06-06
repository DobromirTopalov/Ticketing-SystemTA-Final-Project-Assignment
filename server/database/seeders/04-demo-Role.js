'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'CEO',
    }, {
      name: 'Senior',
    }, {
      name: 'Regular',
    }, {
      name: 'Junior',
    }, {
      name: 'Trainee',
    }, {
      name: 'Other',
    }].map( (el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
