'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('status', [
      { id: '5', name: 'Préstamo' },
      { id: '6', name: 'Contingencia' },
      { id: '7', name: 'Guardia' },
      { id: '8', name: 'Asignado' },
      { id: '9', name: 'Vacante' },
    ])
  },

  async down (queryInterface, Sequelize) {
    return
  }
};
