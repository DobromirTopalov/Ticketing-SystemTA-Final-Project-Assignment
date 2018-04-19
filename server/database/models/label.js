'use strict';
module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define('Label', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Label.associate = (models) => {
  };

  return Label;
};
