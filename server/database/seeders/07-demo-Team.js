'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teams', [{
        name: 'MAN',
        description: 'MAN driver',
        teamImgUrl: 'somePhoto.jpg',
        TeamLeaderId: 2,
        CompanyId: 1,
      }, {
        name: 'Volvo',
        description: 'Volvo driver',
        teamImgUrl: 'somePhoto.jpg',
        TeamLeaderId: 1,
        CompanyId: 1,
      }, {
        name: 'Mr.Proper',
        description: 'Floor cleaners',
        teamImgUrl: 'somePhoto.jpg',
        TeamLeaderId: 11,
        CompanyId: 2,
      }, {
        name: 'App DEV',
        description: 'App developers',
        teamImgUrl: 'somePhoto.jpg',
        TeamLeaderId: 6,
        CompanyId: 3,
      }, {
        name: 'App TEST',
        description: 'App testers',
        teamImgUrl: 'somePhoto.jpg',
        TeamLeaderId: 7,
        CompanyId: 3,
      }, {
        name: 'Home security',
        description: 'Secure houses',
        teamImgUrl: 'somePhoto.jpg',
        TeamLeaderId: 13,
        CompanyId: 4,
      }].map( (el) => {
        el.updatedAt = new Date;
        el.createdAt = new Date;
        return el;
      }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {});
  },
};
