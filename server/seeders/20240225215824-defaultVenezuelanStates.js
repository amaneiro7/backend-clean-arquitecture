'use strict';

const states = require('./location/state');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('states', states.map(({ id, name, regionId }) => ({
      id,
      region_id: regionId,
      name: name
    })), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('states', null, {})
  }
};
