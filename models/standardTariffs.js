'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StandardTariff extends Model {
    static associate(models) {}
  };
  StandardTariff.init({
    vehicleClass: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: { msg: 'Standard Taariff should have a vehicle class' },
        notEmpty: { msg: 'Vehicle class should not be empty' },
      }
    },
    standardTariff:{
      type: DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull: { msg: 'Standard Tariff should have an amount' },
        notEmpty: { msg: 'Amount should not be empty' },
      }
    }
  
  }, {
    sequelize,
    modelName: 'StandardTariff',
    tableName:'standardTariff'
  });
  return StandardTariff;
};