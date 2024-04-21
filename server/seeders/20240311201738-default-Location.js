'use strict';

const { siteMCBOlocation, agenciasSite, almacenes } = require('./location/locations');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const location = siteMCBOlocation.concat(agenciasSite, almacenes)
   return queryInterface.bulkInsert('locations', location.map(({id, typeOfSiteId, siteId, name, subnet}) => ({
    id,
    type_of_site_id: typeOfSiteId,
    site_id: siteId,
    name,
    subnet
   })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('locations', null, {})
  }
};
