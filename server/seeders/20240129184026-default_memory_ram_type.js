'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('memory_ram_types', [
        {
          id: 1,
          name: 'DDR2'
        },
        {
          id: 2,
          name: 'DDR2L'
        },
        {
          id: 3,
          name: 'DDR3'
        },
        {
          id: 4,
          name: 'DD3L'
        },
        {
          id: 5,
          name: 'DDR4'
        },
        {
          id: 6,
          name: 'DDR4L'
        },
        {
          id: 7,
          name: 'DDR5'
        },
        {
          id: 8,
          name: 'DDR5L'
        },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('memory_ram_types', null, {})
  }
};
