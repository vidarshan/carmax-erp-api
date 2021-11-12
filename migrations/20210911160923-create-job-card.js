'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobCard', {
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
      startTimeAndDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endTimeAndDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      completedTimeAndDate:{
        type: Sequelize.DATE,
        allowNull: true,
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      jobType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      currentMileage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vehicleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      employeeId:{
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
    await queryInterface.dropTable('jobCard');
  },
};
