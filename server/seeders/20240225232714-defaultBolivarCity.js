'use strict';

const cities = [  
  { name: 'Ciudad Bolívar', stateId: 6 },
  { name: 'Puerto Ordaz', stateId: 6 },
  { name: 'San Feliz', stateId: 6 },
  { name: 'Unare', stateId: 6 }
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
