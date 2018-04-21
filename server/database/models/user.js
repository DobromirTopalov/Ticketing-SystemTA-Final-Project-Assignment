'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatarImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  User.associate = (models) => {
    const {
      Company,
      Role,
    } = models;

    User.belongsTo(Company, { onDelete: 'cascade' });
    User.belongsTo(Role, { onDelete: 'cascade' });
  };

  return User;
};
