'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate({Supplier, User}) {
      this.belongsTo(User, {
        foreignKey: 'userId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      this.belongsTo(Supplier, {
        foreignKey: 'supplierId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  Inventory.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
          notNull: { msg: 'Inventory item should have a name' },
          notEmpty: { msg: 'Name cannot be empty' },
        },
      },
      inUseQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Inventory should have a in use quantity' },
          notEmpty: { msg: 'In use quantity cannot be empty' },
        },
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false,
        validate: {
          notNull: { msg: 'Inventory should have a verified value' },
          notEmpty: { msg: 'Verified value cannot be empty' },
        },
      },
      availableQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Inventory should have a available quantity' },
          notEmpty: { msg: 'Available quantity cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Inventory',
      tableName: 'inventory',
    }
  );
  return Inventory;
};
