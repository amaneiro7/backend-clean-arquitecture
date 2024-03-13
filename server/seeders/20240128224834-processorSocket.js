'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('processor_sockets', [
        { id: 1, name: 'LGA 775' },
        { id: 2, name: 'Socket M' },
        { id: 3, name: 'LGA 771' },
        { id: 4, name: 'Socket P' },
        { id: 5, name: 'Socket 478' },
        { id: 6, name: 'LGA 1150' },
        { id: 7, name: 'LGA 1151' },
        { id: 8, name: 'LGA 1155' },
        { id: 9, name: 'LGA 1156' },
        { id: 10, name: 'LGA 1366' },
        { id: 11, name: 'FCBGA 1170' },
        { id: 12, name: 'FCBGA 1528' },
        { id: 13, name: 'FCPGA 988' },
        { id: 14, name: 'FCBGA 1023' },
        { id: 15, name: 'FCBGA 1449' },
        { id: 16, name: 'PGA 370' },
        { id: 17, name: 'FCBGA 1440' },
        { id: 18, name: 'FCBGA 1168' },
        { id: 19, name: 'FCBGA 1356' },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('processor_sockets', null, {})
  }
};
