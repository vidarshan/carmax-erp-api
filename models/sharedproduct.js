'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SharedProduct extends Model {

    static associate({Product}) {
      this.belongsTo(Product, {
        foreignKey:'productId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        targetKey:'id'
      })
    }
  };
  SharedProduct.init({
    unitSize:{
      type: DataTypes.STRING,
      allowNull: false,
          validate: {
            notNull: { msg: 'Product should have a unit size' },
            notEmpty: { msg: 'Unit size should not be empty' },
          },

    },
    unitType:{
      type: DataTypes.STRING,
      allowNull: false,
          validate: {
            notNull: { msg: 'Product should have a unit type' },
            notEmpty: { msg: 'Unit type should not be empty' },
          },
    } 
  }, {
    sequelize,
    modelName: 'SharedProduct',
    tableName:'sharedProduct'
  });
  return SharedProduct;
};