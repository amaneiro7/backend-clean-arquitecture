'use strict';

const regions = require('./location/region.js')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('regions', regions.map(({id, name})=> ({
      id,
      name
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('regions', null, {})
  }
};
