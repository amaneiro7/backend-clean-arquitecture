'use strict';

const cities = [  
  { name: 'Clabozo', stateId: 12 },
  { name: 'El Sombrero', stateId: 12 },
  { name: 'San Juan de los Morros', stateId: 12 },
  { name: 'Tucupido', stateId: 12 },
  { name: 'Valle de la Pascua', stateId: 12 }
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
