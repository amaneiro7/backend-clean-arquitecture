'use strict';

const {hddCapacities} = require('./DiscoDuro/hddCapacities');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hard_drive_capacities', hddCapacities.map(({id, name}) => ({id, name})), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hard_drive_capacities', null, {})
  }
};
