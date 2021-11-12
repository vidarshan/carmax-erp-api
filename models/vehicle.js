'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate({ Customer, WorkHistory, JobCard, Invoice }) {
      this.belongsTo(Customer, {
        foreignKey: 'customerId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      this.hasOne(WorkHistory, { foreignKey: 'vehicleId', onDelete: 'CASCADE' });
      this.hasOne(JobCard, { foreignKey: 'vehicleId', onDelete: 'CASCADE' });
      this.hasMany(Invoice, { foreignKey: 'vehicleId', onDelete: 'CASCADE' });
    }
  }
  Vehicle.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      vehicleNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Vehicle should have a vehicle number' },
          notEmpty: { msg: 'Vehicle number should not be empty' },
        },
      },
      chassisNo: {
        type: DataTypes.STRING,
        allowNull: true
      },

      make: {
        type: DataTypes.STRING,
        allowNull: true
      },
      model: {
        type: DataTypes.STRING,
        allowNull: true
      },
      YOM: {
        type: DataTypes.DATE,
        allowNull: true
      },
      lastMileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Vehicle should have a last mileage' },
          notEmpty: { msg: 'Mileage should not be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Vehicle',
      tableName: 'vehicle',
    }
  );
  return Vehicle;
};
