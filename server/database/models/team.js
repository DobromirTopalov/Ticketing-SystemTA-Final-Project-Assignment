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
  }, {
    timestamps: true,
    paranoid: true,
  });
  Team.associate = (models) => {
    const {
      User,
      Company,
    } = models;

    Team.belongsTo(User, {
      as: 'teamLeaderId',
      foreignKey: 'TeamLeaderId',
      allowNull: false,
      onDelete: 'cascade',
    });

    Team.belongsTo(Company, { onDelete: 'cascade' });
    Team.belongsToMany(User, {
      through: 'TeamUser',
      onDelete: 'cascade',
    });
    User.belongsToMany(Team, {
      through: 'TeamUser',
      onDelete: 'cascade',
    });
  };

  return Team;
};
