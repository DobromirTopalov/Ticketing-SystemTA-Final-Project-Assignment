'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tickets', [{
        StatusId: 2,
        description: 'Drive to Sofia and bring beer!',
        LabelId: 1,
        deadline: '17.04.18 19:45',
        TeamId: 2,
        RequesterId: 2,
        AssigneeId: 3,
        EscalationContactId: 2,
      }, {
        StatusId: 4,
        description: 'Drive to Burgas and bring more beer!',
        LabelId: 3,
        deadline: '24.04.18 19:15',
        TeamId: 1,
        RequesterId: 1,
        AssigneeId: 2,
        EscalationContactId: 2,
      }, {
        StatusId: 1,
        description: 'Drive to Varna and bring girls!',
        LabelId: 1,
        deadline: '24.04.18 23:30',
        TeamId: 2,
        RequesterId: 1,
        AssigneeId: 1,
        EscalationContactId: 1,
      }, {
        StatusId: 1,
        description: 'Develop a new platform to show our latest features',
        LabelId: 1,
        deadline: '30.04.18 12:00',
        TeamId: 4,
        RequesterId: 7,
        AssigneeId: 5,
        EscalationContactId: 5,
      }, {
        StatusId: 2,
        description: 'Develop a new platform to show statistics',
        LabelId: 3,
        deadline: '28.09.18 12:00',
        TeamId: 4,
        RequesterId: 7,
        AssigneeId: 5,
        EscalationContactId: 5,
      }, {
        StatusId: 3,
        description: 'Develop a new faster algorithm',
        LabelId: 3,
        deadline: '03.06.18 22:00',
        TeamId: 4,
        RequesterId: 7,
        AssigneeId: 5,
        EscalationContactId: 7,
      }, {
        StatusId: 1,
        description: 'Fix all CCVT Cameras in Ivan\'s store',
        LabelId: 1,
        deadline: '10.10.18 02:00',
        TeamId: 6,
        RequesterId: 13,
        AssigneeId: 13,
        EscalationContactId: 13,
      }].map( (el) => {
        el.updatedAt = new Date;
        el.createdAt = new Date;
        return el;
      }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  },
};
