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
  }, {
    timestamps: true,
    paranoid: true,
  });
  Commentary.associate = (models) => {
    const {
      User,
      Ticket,
    } = models;

    Commentary.belongsTo(User, { onDelete: 'cascade' });
    Commentary.belongsTo(Ticket, { onDelete: 'cascade' });
  };

  return Commentary;
};
