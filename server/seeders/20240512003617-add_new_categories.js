'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      { id: '11', name: 'Mouses'},
      { id: '12', name: 'BAMs'},
      { id: '13', name: 'Impresoras Multifuncionales'},
      { id: '14', name: 'Celulares'},
      { id: '15', name: 'Escaners'},
    ])
  },

  async down (queryInterface, Sequelize) {
    return
  }
};
