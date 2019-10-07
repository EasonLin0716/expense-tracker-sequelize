'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    merchant: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    date: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {});
  Record.associate = function (models) {
    // associations can be defined here
    Record.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Record;
};