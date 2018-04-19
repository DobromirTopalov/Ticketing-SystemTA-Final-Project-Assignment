'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    teamImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {});
  Team.associate = (models) => {
    const {
      User,
      Company,
    } = models;

    Team.belongsTo(User, {
      as: 'teamLeaderId',
      foreignKey: 'TeamLeaderId',
      allowNull: false,
    });

    Team.belongsTo(Company);
    Team.belongsToMany(User, {
      through: 'TeamUser',
    });
    User.belongsToMany(Team, {
      through: 'TeamUser',
    });
  };

  return Team;
};
