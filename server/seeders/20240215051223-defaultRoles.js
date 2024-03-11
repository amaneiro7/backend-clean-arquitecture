'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('role', [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Especialista' },
      { id: 3, name: 'Coordinador' },
      { id: 4, name: 'Gerente' }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('role', null, {})
  }
};
