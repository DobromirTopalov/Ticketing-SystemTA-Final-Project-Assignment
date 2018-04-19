'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Ticket.associate = (models) => {
    const {
      User,
      Team,
      Status,
      Label,
    } = models;

    Ticket.belongsTo(Team);
    Ticket.belongsTo(Status);
    Ticket.belongsTo(Label);

    Ticket.belongsToMany(User, {
      through: 'TicketUser',
    });
    User.belongsToMany(Ticket, {
      through: 'TicketUser',
    });

    Ticket.belongsTo(User, {
      as: 'requesterId',
      foreignKey: 'RequesterId',
      allowNull: false,
    });

    Ticket.belongsTo(User, {
      as: 'assigneeId',
      foreignKey: 'AssigneeId',
      allowNull: false,
    });

    Ticket.belongsTo(User, {
      as: 'escalationContactId',
      foreignKey: 'EscalationContactId',
      allowNull: true,
    });
  };

  return Ticket;
};
