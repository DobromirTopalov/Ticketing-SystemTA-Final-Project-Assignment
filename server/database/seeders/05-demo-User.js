'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'ivan@abv.bg',
      password: 'ivan123',
      firstName: 'Ivan',
      lastName: 'Ivanov',
      RoleId: 3,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 1,
    }, {
      email: 'maria@abv.bg',
      password: 'maria123',
      firstName: 'Maria',
      lastName: 'Slavcheva',
      RoleId: 5,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 1,
    }, {
      email: 'georgi@gmail.com',
      password: 'georgi123',
      firstName: 'Georgi',
      lastName: 'Georgiev',
      RoleId: 3,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 1,
    }, {
      email: 'maia@gmail.com',
      password: 'maia123',
      firstName: 'Maia',
      lastName: 'Lecheva',
      RoleId: 4,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 3,
    }, {
      email: 'hristo@mail.bg',
      password: 'hristo123',
      firstName: 'Hristo',
      lastName: 'Stoichkov',
      RoleId: 1,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 3,
    }, {
      email: 'dobri@gmail.com',
      password: 'dobri123',
      firstName: 'Dobri',
      lastName: 'Topalov',
      RoleId: 2,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 3,
    }, {
      email: 'stilian@mail.bg',
      password: 'stilian123',
      firstName: 'Stilian',
      lastName: 'Martinov',
      RoleId: 4,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 3,
    }, {
      email: 'nia@mail.bg',
      password: 'nia123',
      firstName: 'Nia',
      lastName: 'Vasileva',
      RoleId: 3,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 4,
    }, {
      email: 'gergana@amazon.com',
      password: 'gergana123',
      firstName: 'Gergana',
      lastName: 'Milkova',
      RoleId: 2,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 1,
    }, {
      email: 'gregor@gmail.com',
      password: 'gregor123',
      firstName: 'Gregor',
      lastName: 'Wunderstener',
      RoleId: 6,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 1,
    }, {
      email: 'claudia@gmail.com',
      password: 'claudia123',
      firstName: 'Claudia',
      lastName: 'Wagner',
      RoleId: 7,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 2,
    }, {
      email: 'zaro@yahooo.com',
      password: 'zaro123',
      firstName: 'Zaro',
      lastName: 'Lavrov',
      RoleId: 6,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 2,
    }, {
      email: 'boro@hotmail.com',
      password: 'boro123',
      firstName: 'Borko',
      lastName: 'Stoichev',
      RoleId: 7,
      avatarImgUrl: 'somePhoto.jpg',
      CompanyId: 3,
    }].map((el) => {
      el.updatedAt = new Date;
      el.createdAt = new Date;
      return el;
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
