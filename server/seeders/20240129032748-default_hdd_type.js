'use strict';

const hddTypes = require('./DiscoDuro/hddType');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hard_drive_types', hddTypes.map(({id, name}) => ({id, name})), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hard_drive_types', null, {})
  }
};
