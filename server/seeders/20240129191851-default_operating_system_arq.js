'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('operating_system_arqs', [      
        {
          id: 1,
          name: 'x86',
        },
        {
          id: 2,
          name: 'x64',
        }        
  ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface('operating_system_arqs', null, {})
  }
};
