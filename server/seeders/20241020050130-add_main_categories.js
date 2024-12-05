'use strict';

const categoryData = [
  { id: '1', name: 'Equipos de computación' },
  { id: '2', name: 'Pantallas y Displays' },
  { id: '3', name: 'Impresoras' },
  { id: '4', name: 'Partes y piezas' },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('main_categories', categoryData.map(({ id, name }) => ({
      id,
      name
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('main_categories', null, {})
  }
};
