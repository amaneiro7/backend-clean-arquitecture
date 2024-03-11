'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hard_drive_capacities', [
      { id: 1, value: 40 },
      { id: 2, value: 80 },
      { id: 3, value: 120 },
      { id: 4, value: 160 },
      { id: 5, value: 250 },
      { id: 6, value: 320 },
      { id: 7, value: 500 },
      { id: 8, value: 768 },
      { id: 9, value: 1000 },
      { id: 10, value: 2000 },
      { id: 11, value: 4000 },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hard_drive_capacities', null, {})
  }
};
