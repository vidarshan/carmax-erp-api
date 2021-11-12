'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    static associate({PurchaseOrder, GoodReceived, Inventory}) {
      this.hasMany(PurchaseOrder, { foreignKey: 'supplierId', onDelete: 'CASCADE' });
      this.hasMany(GoodReceived, { foreignKey: 'supplierId', onDelete: 'CASCADE' });
      this.hasMany(Inventory, { foreignKey: 'supplierId', onDelete: 'CASCADE' });
    }
  }
  Supplier.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Supplier should have a address' },
          notEmpty: { msg: 'Address cannot be empty' },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Supplier should have a name' },
          notEmpty: { msg: 'Name cannot be empty' },
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Supplier should have a contact' },
          notEmpty: { msg: 'Contact cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Supplier',
      tableName: 'supplier',
    }
  );
  return Supplier;
};
