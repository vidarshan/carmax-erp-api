'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Occasion extends Model {
    static associate({ Customer }) {
      this.belongsTo(Customer, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE',
        targetKey: 'id',
      });
    }
  }
  Occasion.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      occasionName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Occasion should have a name' },
          notEmpty: { msg: 'Name should not be empty' },
        },
      },
      occasionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Occasion should have a date' },
          notEmpty: { msg: 'Date should not be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Occasion',
      tableName: 'occasion',
    }
  );
  return Occasion;
};
