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
  }, {
    timestamps: true,
    paranoid: true,
  });
  Ticket.associate = (models) => {
    const {
      User,
      Team,
      Status,
      Label,
    } = models;

    Ticket.belongsTo(Team, { onDelete: 'cascade' });
    Ticket.belongsTo(Status, { onDelete: 'cascade' });
    Ticket.belongsTo(Label, { onDelete: 'cascade' });

    Ticket.belongsToMany(User, {
      through: 'TicketUser',
      onDelete: 'cascade',
    });
    User.belongsToMany(Ticket, {
      through: 'TicketUser',
      onDelete: 'cascade',
    });

    Ticket.belongsTo(User, {
      as: 'requesterId',
      foreignKey: 'RequesterId',
      allowNull: false,
      onDelete: 'cascade',
    });

    Ticket.belongsTo(User, {
      as: 'assigneeId',
      foreignKey: 'AssigneeId',
      allowNull: false,
      onDelete: 'cascade',
    });

    Ticket.belongsTo(User, {
      as: 'escalationContactId',
      foreignKey: 'EscalationContactId',
      allowNull: true,
      onDelete: 'cascade',
    });
  };

  return Ticket;
};
