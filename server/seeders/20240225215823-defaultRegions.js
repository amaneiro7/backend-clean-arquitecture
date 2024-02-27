'use strict';

const regions = {
  CAPITAL: 'Capital',
    CENTRAL: 'Central',
    CENTROCCIDENTAL: 'Centroccidental',
    GUAYANA: 'Guayana',
    INSULAR: 'Insular',
    LOSANDES: 'Los Andes',
    LOSLLANOS: 'Los Llanos',
    ORIENTAL: 'Oriental',
    OCCIDENTE: 'Occidente'
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('regions', Object.values(regions).map((region, index) => ({
      id: index + 1,
      name: region
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('regions', null, {})
  }
};
