'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('main_categories', [
      {
        id: '5',
        name: 'Impresoras Financieras',
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('main_categories', { id: '5' }, {})
  }
};
