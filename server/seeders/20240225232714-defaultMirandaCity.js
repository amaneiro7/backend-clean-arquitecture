'use strict';

const cities = [  
  { name: 'Caracas', stateId: 15 },
  { name: 'Carrizales', stateId: 15 },
  { name: 'Caucagua', stateId: 15 },
  { name: 'Charavalle', stateId: 15 },
  { name: 'Guarenas', stateId: 15 },
  { name: 'Guatire', stateId: 15 },
  { name: 'Los Teques', stateId: 15 },
  { name: 'San Antonio de los Altes', stateId: 15 },
  { name: 'San José de Rio Chico', stateId: 15 },
  { name: 'Santa Teresa', stateId: 15 }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('cities', cities.map(({ name, stateId }, index) => ({
      id: stateId * 100 + index + 1,
      state_id: stateId,
      name: name
    })), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('cities', null, {})
  }
};
