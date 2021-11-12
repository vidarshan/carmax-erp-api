'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobCard extends Model {
    static associate({ProductUsed, Vehicle, Job, Employee, Invoice}) {
      this.hasMany(ProductUsed,  { foreignKey: 'jobCardId', onDelete: 'CASCADE' });
      this.belongsTo(Vehicle, {
        foreignKey: 'vehicleId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      this.hasMany(Job,  { foreignKey: 'jobCardId', onDelete: 'CASCADE' });
      this.belongsTo(Employee, {
        foreignKey: 'employeeId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
     // this.hasOne(Invoice,  { foreignKey: 'jobCardId', onDelete: 'CASCADE' });
    }
  }
  JobCard.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      startTimeAndDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Job card should have a start time and date',
          },
          notEmpty: { msg: 'Start time and date cannot be empty' },
        },
      },
      endTimeAndDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      completedTimeAndDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Job card should have a job type' },
          notEmpty: { msg: 'Job Type cannot be empty' },
        },
      },
      currentMileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Job card should have a current mileage' },
          notEmpty: { msg: 'Current mileage cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'JobCard',
      tableName: 'jobCard',
    }
  );
  return JobCard;
};
