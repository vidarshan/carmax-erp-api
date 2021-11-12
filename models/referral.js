'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referral extends Model {
    static associate({Customer}) {
      // Even if the customer has many referrals, when the invoice is generated only one discount 
      // is applied.
      this.belongsTo(Customer, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE',
        targetKey: 'id',
      });
    }
  }
  Referral.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      guest: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Referral should have a guest' },
          notEmpty: { msg: 'Guest should not be empty' },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Referral should have a date' },
          notEmpty: { msg: 'Date should not be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Referral',
      tableName: 'referral',
    }
  );
  return Referral;
};
