'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NonShared extends Model {
    static associate({Product}) {
      this.belongsTo(Product, {
        foreignKey:'productId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        targetKey:'id'
      })
    }
  };
  NonShared.init({}, {
    sequelize,
    modelName: 'NonSharedProduct',
    tableName:'nonSharedProduct'
  });
  return NonShared;
};