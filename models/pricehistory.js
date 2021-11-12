'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PriceHistory extends Model {
    static associate(models) {}
  }
  PriceHistory.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      buyingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Price History should have a date' },
          notEmpty: { msg: 'Buying price should not be empty' },
        },
      },
      sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Price History should have a selling price' },
          notEmpty: { msg: 'Selling price should not be empty' },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Price History should have a date' },
          notEmpty: { msg: 'Date should not be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'PriceHistory',
      tableName: 'priceHistory',
    }
  );
  return PriceHistory;
};
