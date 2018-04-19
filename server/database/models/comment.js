'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentary = sequelize.define('Commentary', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  Commentary.associate = (models) => {
    const {
      User,
      Ticket,
    } = models;

    Commentary.belongsTo(User);
    Commentary.belongsTo(Ticket);
  };

  return Commentary;
};
