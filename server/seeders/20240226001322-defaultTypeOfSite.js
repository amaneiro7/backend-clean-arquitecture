'use strict';
const typeOfSite = {
  ADMINISTRATIVE: 'Sede Administrativa',
  AGENCY: 'Agencia',
  WEREHOUSE: 'Almacén'
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('type_of_sites', 
      Object.values(typeOfSite)
        .map((name, index) => ({
          id: index + 1, 
          name
        })
      ))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('type_of_sites', null, {})
  }
};
