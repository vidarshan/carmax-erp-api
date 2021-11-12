'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkHistory extends Model {
    static associate({Vehicle, Invoice, Job}) {
      this.belongsTo(Vehicle, {
        foreignKey: 'vehicleId',
        onDelete: 'CASCADE',
        targetKey: 'id',
      });
      this.hasMany(Job, { foreignKey: 'workHistoryId', onDelete: 'CASCADE' });
    }
  }
  WorkHistory.init(
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
          notNull: { msg: 'Work history should have a date' },
          notEmpty: { msg: 'Date should not be empty' },
        },
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'WorkHistory',
      tableName: 'workHistory',
    }
  );
  return WorkHistory;
};
