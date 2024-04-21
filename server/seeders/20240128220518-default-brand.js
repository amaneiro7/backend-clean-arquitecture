'use strict';

const {brandsData} = require('./BrandData/brands');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('brands', brandsData.map(({id, name}) => ({
        id,
        name,
        created_at: new Date(),
        updated_at: new Date()
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('brands', null, {})
  }
};

