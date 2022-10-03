'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chairs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['VIP', 'CLASSIC'],
      },
      status: {
        type: Sequelize.ENUM,
        values: ['BOOKED', 'BOOKING', 'FREE'],
      },
      showTimeID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ShowTimes',
          key: 'id',
        },
      },
      userID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chairs');
  },
};
