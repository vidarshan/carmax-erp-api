'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vehicle', {
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
      vehicleNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chassisNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      make: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      YOM: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastMileage: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      customerId: {
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
    await queryInterface.dropTable('vehicle');
  },
};
