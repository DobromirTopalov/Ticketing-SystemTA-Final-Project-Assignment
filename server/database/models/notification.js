'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NotificationImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wasRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
  Notification.associate = (models) => {
    const {
      User,
    } = models;

    Notification.belongsTo(User, { onDelete: 'cascade' });
  };

  return Notification;
};
