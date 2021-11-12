'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer', {
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
      firstname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      contact: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      dob: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      houseNo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      streetAddress: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      streetAddress2: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      customerType: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('customer');
  },
};
