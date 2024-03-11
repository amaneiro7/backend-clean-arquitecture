'use strict';

const cities = [  
  { name: 'Boconó', stateId: 21 },
  { name: 'La Puerta', stateId: 21 },
  { name: 'Sabana de Mendoza', stateId: 21 },
  { name: 'San Rafael de Carvajal', stateId: 21 },
  { name: 'Santa Isabel', stateId: 21 },
  { name: 'Trujillo', stateId: 21 },
  { name: 'Valera', stateId: 21 },
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
