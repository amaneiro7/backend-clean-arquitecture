'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('sites', sites.map(({cityId, address, name}, index) => ({
    id: cityId * 100 + index,
    city_id: cityId,
    address,
    name
   })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sites', null, {})
  }
};
