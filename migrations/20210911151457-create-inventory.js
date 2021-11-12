'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory', {
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
      name:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      inUseQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      availableQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      verifiedBy:{
        allowNull:false,
        type: Sequelize.INTEGER
      },
      verified:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
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
    await queryInterface.dropTable('inventory');
  },
};
