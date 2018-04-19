'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [{
        name: 'TransTrans',
        description: 'Transport services',
        companyImgUrl: 'somePhoto.jpg',
        sector: 'transport business',
        webpage: 'https://someweb.com/',
      }, {
        name: 'CILF',
        description: 'Clearing services',
        companyImgUrl: 'somePhoto.jpg',
        sector: 'clearing business',
        webpage: 'https://someweb.com/',
      }, {
        name: 'BinocularSOFT',
        description: 'Optics services',
        companyImgUrl: 'somePhoto.jpg',
        sector: 'optics business',
        webpage: 'https://someweb.com/',
      }, {
        name: 'SecureO',
        description: 'Security services',
        companyImgUrl: 'somePhoto.jpg',
        sector: 'security business',
        webpage: 'https://someweb.com/',
      }].map( (el) => {
        el.updatedAt = new Date;
        el.createdAt = new Date;
        return el;
      }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  },
};
