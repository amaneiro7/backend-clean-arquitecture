'use strict';

const cities = [  
  { name: 'Bejuma', stateId: 7 },
  { name: 'Guacara', stateId: 7 },
  { name: 'Los Guayos', stateId: 7 },
  { name: 'Montalbán', stateId: 7 },
  { name: 'Naguanagua', stateId: 7 },
  { name: 'Puerto Cabello', stateId: 7 },
  { name: 'San Diego', stateId: 7 },
  { name: 'Tocuyito', stateId: 7 },
  { name: 'Valencia', stateId: 7 },
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
