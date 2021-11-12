'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate({JobCard, PurchaseOrder}) {
      this.hasMany(JobCard, { foreignKey: 'employeeId', onDelete: 'CASCADE' });
      this.hasMany(PurchaseOrder, { foreignKey: 'employeeId', as: 'createdBy', onDelete: 'CASCADE' });
    }
  }
  Employee.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Employee should have a name' },
          notEmpty: { msg: 'Name cannot be empty' },
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Employee should have a contact' },
          notEmpty: { msg: 'Contact cannot be empty' },
        },
      },
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: 'Employee should be activated or deactivated' },
          notEmpty: { msg: 'Activated cannot be empty' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Employee',
      tableName: 'employee',
    }
  );
  return Employee;
};
