'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      couponID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Coupons',
          key: 'id',
        },
      },
      showTimeID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ShowTimes',
          key: 'id',
        },
      },
      totalPrice: {
        type: Sequelize.FLOAT,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  },
};
