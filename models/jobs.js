'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate({JobCard, WorkHistory}) {
      this.belongsTo(JobCard, {
        foreignKey: 'jobCardId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      this.belongsTo(WorkHistory, {
        foreignKey:'workHistoryId',
        onDelete:'CASCADE',
        targetKey:'id'
      })
    }
  }
  Job.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      standardTariff: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Job should have a standard tariff' },
          notEmpty: { msg: 'Standard tariff cannot be empty' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Job should have a description' },
          notEmpty: { msg: 'Description cannot be empty' },
        },
      },
      vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Job should have a vehicle type' },
          notEmpty: { msg: 'Vehicle type cannot be empty' },
        },
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Job should have a make' },
          notEmpty: { msg: 'MakeCurrent mileage cannot be empty' },
        },
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Job should have a model' },
          notEmpty: { msg: 'Model cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Job',
      tableName: 'job',
    }
  );
  return Job;
};
