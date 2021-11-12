'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('purchaseorder', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      settlementDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      item: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      purchaseType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplier:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplyLeadTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supplierId:  {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('purchaseorder');
  },
};
