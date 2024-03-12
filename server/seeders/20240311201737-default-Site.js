'use strict';

const sites = [
  {id: 1, cityId: 2408, address: 'Calle 77 (5 De Julio) Esquina Av. 17 (Baralt)', name: 'Edif Torre BNC'}
  
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('sites', sites.map(({id, cityId, address, name}) => ({
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
