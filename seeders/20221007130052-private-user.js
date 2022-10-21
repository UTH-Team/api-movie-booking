"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          firstName: "Doãn",
          lastName: "Dương",
          email: "doan@gmail.com",
          password: "123456",
          role: "ADMIN",
          createdAt: "2022-10-07",
          updatedAt: "2022-10-07",
        },
        {
          id: 2,
          firstName: "USER",
          lastName: "01",
          email: "user01@gmail.com",
          password: "123456",
          role: "USER",
          createdAt: "2022-10-07",
          updatedAt: "2022-10-07",
        },
        {
          id: 3,
          firstName: "USER",
          lastName: "03",
          email: "user03@gmail.com",
          password: "123456",
          role: "VIP_USER",
          createdAt: "2022-10-07",
          updatedAt: "2022-10-07",
        },
        {
          id: 4,
          firstName: "SALE",
          lastName: "01",
          email: "sale01@gmail.com",
          password: "123456",
          role: "SALE",
          createdAt: "2022-10-07",
          updatedAt: "2022-10-07",
        },
        {
          id: 5,
          firstName: "SALE",
          lastName: "02",
          email: "sale02@gmail.com",
          password: "123456",
          role: "SALE",
          createdAt: "2022-10-07",
          updatedAt: "2022-10-07",
        },
        {
          id: 6,
          firstName: "MANAGER",
          lastName: "01",
          email: "manager01@gmail.com",
          password: "123456",
          role: "MANAGER",
          createdAt: "2022-10-07",
          updatedAt: "2022-10-07",
        },
        {
          id: 7,
          firstName: "MANAGER",
          lastName: "02",
          email: "manager02@gmail.com",
          password: "123456",
          role: "MANAGER",
          createdAt: "2022-10-07",
          updatedAt: "2022-10-07",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
