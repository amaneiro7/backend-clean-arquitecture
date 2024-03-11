'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hard_drive_types', [
      { id: 1, name: 'HDD' },
      { id: 2, name: 'SDD' },
      { id: 3, name: 'SDD M.2' },
      { id: 4, name: 'IDE' }   
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hard_drive_types', null, {})
  }
};
