'use strict';

const { categoryBAMData } = require('./categoryData/newCategories');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', categoryBAMData.map(({ id, name }) => ({
      id,
      name
    })))
  },

  async down (queryInterface, Sequelize) {
    return
  }
};
