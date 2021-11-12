'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate({Customer, Vehicle, JobCard, WorkHistory}) {
      this.belongsTo(Customer, {
        foreignKey: 'customerId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      this.belongsTo(Vehicle, {
        foreignKey: 'vehicleId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      });
      // this.belongsTo(JobCard, {
      //   foreignKey: 'jobCardId',
      //   targetKey: 'id',
      //   onDelete: 'CASCADE',
      // });
    }
  }
  Invoice.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      mileageAtInvoice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Invoice should have a mileage at invoice' },
          notEmpty: { msg: 'Mileage at invoice cannot be empty' },
        },
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Invoice should have a created by' },
          notEmpty: { msg: 'Created by cannot be empty' },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: 'Invoice should have a date' },
          notEmpty: { msg: 'Date cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Invoice',
      tableName: 'invoice',
    }
  );
  return Invoice;
};
