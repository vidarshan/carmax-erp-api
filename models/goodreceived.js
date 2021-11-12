'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoodReceived extends Model {
    static associate({PurchaseOrder, Supplier}) {
      this.belongsTo(PurchaseOrder, {
        foreignKey: 'goodRecievedId',
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
  GoodReceived.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Good received should have a name' },
          notEmpty: { msg: 'Name cannot be empty' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Good received should have a description' },
          notEmpty: { msg: 'Description cannot be empty' },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Good received should have a date' },
          notEmpty: { msg: 'Date cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'GoodReceived',
      tableName: 'goodReceived',
    }
  );
  return GoodReceived;
};
