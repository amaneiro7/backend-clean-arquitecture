'use strict';

const {operatingSystemArq} = require('./operatingSystem/operatingSystemArq');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('operating_system_arqs', operatingSystemArq.map(({id, name}) => ({id, name})), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('operating_system_arqs', null, {})
  }
};
