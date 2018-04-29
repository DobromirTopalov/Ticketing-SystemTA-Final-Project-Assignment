'use strict';
module.exports = (sequelize, DataTypes) => {
  const TicketUser = sequelize.define('TicketUser', {
    TicketId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  TicketUser.associate = (models) => {
  };

  return TicketUser;
};
