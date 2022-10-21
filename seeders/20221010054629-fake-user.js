'use strict';
const fakeUsers = [... new Array(50)].map((user, idx)=>{
  return ({
    firstName: "User",
    lastName: idx + 1,
    email: `user${idx + 1}@gmail.com`,
    password: "123456",
    role: "USER",
    createdAt: "2022-10-10",
    updatedAt: "2022-10-10"
  })
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users',fakeUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};