'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('processor_sockets', [
        { id: 1, name: 'LGA 775' },
        { id: 2, name: 'Socket M' },
        { id: 3, name: 'LGA 771' },
        { id: 4, name: 'Socket P' },
        { id: 5, name: 'Socket 441' },
        { id: 6, name: 'LGA 1366' },
        { id: 7, name: 'LGA 1156' },        
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('processor_sockets', null, {})
  }
};
