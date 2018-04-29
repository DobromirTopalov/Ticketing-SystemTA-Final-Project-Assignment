'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamUser = sequelize.define('TeamUser', {
    TeamId: {
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
  TeamUser.associate = (models) => {
  };

  return TeamUser;
};
