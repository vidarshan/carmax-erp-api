'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({NonSharedProduct, SharedProduct}) {
      this.hasMany(NonSharedProduct, {foreignKey: 'productId', onDelete:'CASCADE', onUpdate:'CASCADE'});
      this.hasMany(SharedProduct, {foreignKey:'productId', onDelete:'CASCADE', onUpdate:'CASCADE'});
    }
  };
  Product.init({
    productName:{
      type: DataTypes.STRING,
      allowNull: false,
          validate: {
            notNull: { msg: 'Product should have a name' },
            notEmpty: { msg: 'Name should not be empty' },
          },
    } 
    
  }, {
    sequelize,
    modelName: 'Product',
    tableName:'product'
  });
  return Product;
};