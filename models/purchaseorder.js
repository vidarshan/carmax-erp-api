'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseOrder extends Model {
    static associate({Employee, GoodReceived, Supplier}) {
      this.belongsTo(Employee, {
        foreignKey: 'employeeId',
        as:'createdBy',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      this.hasMany(GoodReceived, { foreignKey: 'goodRecievedId', onDelete: 'CASCADE' });
      this.belongsTo(Supplier, {
        foreignKey: 'supplierId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  PurchaseOrder.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Purchase Order should have a date' },
          notEmpty: { msg: 'Date cannot be empty' },
        },
      },
      settlementDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Purchase Order should have a settlement date' },
          notEmpty: { msg: 'Settlement date cannot be empty' },
        },
      },
      item: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Purchase Order should have a item' },
          notEmpty: { msg: 'Item cannot be empty' },
        },
      },
      purchaseType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Purchase Order should have a type' },
          notEmpty: { msg: 'Type cannot be empty' },
        },
      },
      supplyLeadTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Purchase Order should have a supply lead time' },
          notEmpty: { msg: 'Supply lead time cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'PurchaseOrder',
      tableName: 'purchaseorder',
    }
  );
  return PurchaseOrder;
};
