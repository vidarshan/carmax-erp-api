'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate({ Occasion, Vehicle, Referral, Offer, Invoice }) {
      this.hasMany(Occasion, { foreignKey: 'customerId', onDelete: 'CASCADE' });
      this.hasMany(Vehicle, { foreignKey: 'customerId', onDelete: 'CASCADE' });
      this.hasMany(Referral, { foreignKey: 'customerId', onDelete: 'CASCADE' });
      this.hasMany(Offer, { foreignKey: 'customerId', onDelete: 'CASCADE' });
      this.hasMany(Invoice, { foreignKey: 'customerId', onDelete: 'CASCADE' });
    }
  }
  Customer.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User should have a first name' },
          notEmpty: { msg: 'First name should not be empty' },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User should have a last name' },
          notEmpty: { msg: 'Last name should not be empty' },
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User should have a contact number' },
          notEmpty: { msg: 'Contact number should not be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true
      },
      houseNo: {
        type: DataTypes.STRING,
        allowNull: true
      },
      streetAddress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      streetAddress2: {
        type: DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      customerType: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: 'Customer',
      tableName: 'customer',
    }
  );
  return Customer;
};
