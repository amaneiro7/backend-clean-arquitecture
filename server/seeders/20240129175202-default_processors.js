'use strict';

const processors = require("./processor/processors");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('processors', processors.map(({id, product_collection, number_model, frequency, cores, threads}) => {
      return {
        id,
        product_collection,
        number_model,
        frequency,
        cores,
        threads,
        name: `${product_collection} ${number_model} CPU @ ${frequency}`, 
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('processors', null, {})
  }
};
