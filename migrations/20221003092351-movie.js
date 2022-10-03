'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      director: {
        type: Sequelize.STRING,
      },
      actor: {
        type: Sequelize.TEXT,
      },
      rate: {
        type: Sequelize.FLOAT,
      },
      trailer: {
        type: Sequelize.TEXT,
      },
      time: {
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  },
};