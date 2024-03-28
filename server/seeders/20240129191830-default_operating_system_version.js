'use strict';

const operatingSystem = require('./operatingSystem/operatingSystem');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('operating_system_versions', operatingSystem.map(({id, version}) => ({id, version})), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('operating_system_versions', null, {})
  }
};
