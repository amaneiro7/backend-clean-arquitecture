'use strict';

const typeOfSite = require('./location/typeOfSite');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('type_of_sites', typeOfSite.map(({id, name}) => ({
      id,
      name
    }))
      
      )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('type_of_sites', null, {})
  }
};
