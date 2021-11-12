'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    static associate({Offer}) {
      this.belongsTo(Offer, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE',
        targetKey: 'id',
      });
    }
  }
  Offer.init(
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
          notNull: { msg: 'Offer should have a description' },
          notEmpty: { msg: 'Description should not be empty' },
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Offer should have an amount' },
          notEmpty: { msg: 'Amount should not be empty' },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Offer should have a date' },
          notEmpty: { msg: 'Date should not be empty' },
        },
      },
      isExpired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
        validate: {
          notNull: { msg: 'Offer should have expired value' },
          notEmpty: { msg: 'Expired should not be empty' },
        },
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      redeemedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Offer',
      tableName: 'offer',
    }
  );
  return Offer;
};
