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
  }, {});
  Log.associate = (models) => {
    const {
      User,
      Ticket,
    } = models;

    Log.belongsTo(User);
    Log.belongsTo(Ticket);
  };

  return Log;
};
