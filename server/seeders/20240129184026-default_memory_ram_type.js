'use strict';

const memoryRamType = require('./memoryRam/memoryRamType');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('memory_ram_types', memoryRamType.map(({ id, name }) => ({ id, name })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('memory_ram_types', null, {})
  }
};
