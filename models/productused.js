'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductUsed extends Model {
    static associate({JobCard}) {
      this.belongsTo(JobCard, {
        foreignKey: 'jobCardId',
        onDelete: 'CASCADE',
        targetKey: 'id',
      })
    }
  }
  ProductUsed.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      productName: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Product used should have a name' },
          notEmpty: { msg: 'Product name should not be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'ProductUsed',
      tableName: 'productUsed',
    }
  );
  return ProductUsed;
};
