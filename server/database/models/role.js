'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  Role.associate = (models) => {
  };

  return Role;
};
