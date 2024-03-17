'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('input_types', [
      { id: 1, name: 'PS/2'},
      { id: 2, name: 'USB'},
      { id: 3, name: 'Wireless'},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('input_types', null, {})
  }
};
