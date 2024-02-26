'use strict';
const typeOfSite = {
  ADMINISTRATIVE: 'Sede Administrativa',
  AGENCY: 'Agencia'
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('type_of_sites', [
      {
        id: 1,
        name: typeOfSite.ADMINISTRATIVE
      },
      {
        id: 2,
        name: typeOfSite.AGENCY
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('type_of_sites', null, {})
  }
};
