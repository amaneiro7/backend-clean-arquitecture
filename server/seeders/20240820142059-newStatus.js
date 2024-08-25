'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('status', [
      { id: '5', name: 'Préstamo' },
      { id: '6', name: 'Contingencia' },
      { id: '7', name: 'Guardia' },
      { id: '8', name: 'Disponible' },
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('status', {
      id: {
        [Sequelize.Op.in]: ['5', '6', '7', '8', '9'],
      }
    })
  }
};
