'use strict';

const { modelPrinter } = require('./deviceData/modelPrinter');


/** @type {import('sequelize-cli').Migration} */
module.exports = {  
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('models', modelPrinter.map(({id, name, categoryId, brandId}) => ({
      id,
      name,
      category_id: categoryId,
      brand_id: brandId,
      created_at: new Date(),
      updated_at: new Date()
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('models', null, {})
  }

};
