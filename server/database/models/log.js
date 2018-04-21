'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    changes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wasRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  Log.associate = (models) => {
    const {
      User,
      Ticket,
    } = models;

    Log.belongsTo(User, { onDelete: 'cascade' });
    Log.belongsTo(Ticket, { onDelete: 'cascade' });
  };

  return Log;
};
