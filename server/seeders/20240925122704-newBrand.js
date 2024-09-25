'use strict';

const { brandsBamData } = require('./brandData/brandBam');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('brands', brandsBamData.map(({ id, name }) => ({
      id,
      name,
      created_at: new Date(),
      updated_at: new Date()
    })))
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('brands', null, {})
    return
  }
};

