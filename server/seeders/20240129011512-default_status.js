'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('status', [
      {
        id: 1,
        name: 'En Uso'
      },
      {
        id: 2,
        name: 'En Almacen'
      },
      {
        id: 3,
        name: 'Por Desincorporar'
      },
      {
        id: 4,
        name: 'Desincorporado'
      }   
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('status', null, {})
  }
};
