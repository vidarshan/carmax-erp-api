'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueAccount extends Model {
    static associate(models) {}
  }
  RevenueAccount.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Revenue should have a description' },
          notEmpty: { msg: 'Description should not be empty' },
        },
      },
      depositAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Revenue should have an amount' },
          notEmpty: { msg: 'Amount should not be empty' },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Revenue should have a date' },
          notEmpty: { msg: 'Date should not be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'RevenueAccount',
      tableName: 'revenueAccount',
    }
  );
  return RevenueAccount;
};
