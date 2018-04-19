'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Status.associate = (models) => {
  };

  return Status;
};
