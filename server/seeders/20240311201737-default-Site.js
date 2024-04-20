'use strict';

const {parsedSite} = require('./location/sites');



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('sites', parsedSite.map(({id, cityId, address, name}) => ({
    id,
    city_id: cityId,
    address,
    name
   })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sites', null, {})
  }
};
