'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('memory_ram_capacities', [
      {
        id: 1,
        value: 128
      },
      {
        id: 2,
        value: 256
      },
      {
        id: 3,
        value: 512
      },
      {
        id: 4,
        value: 1024
      },
      {
        id: 5,
        value: 2048
      },
      {
        id: 6,
        value: 4096
      },
      {
        id: 7,
        value: 8192
      },
      {
        id: 8,
        value: 16384
      }      
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('memory_ram_capacities', null, {})
  }
};
