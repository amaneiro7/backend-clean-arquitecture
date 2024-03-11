'use strict';

const cities = [  
  { name: 'Cagua', stateId: 4 },
  { name: 'Choroní', stateId: 4 },
  { name: 'La Victoria', stateId: 4 },
  { name: 'Maracay', stateId: 4 },
  { name: 'Palo Negro', stateId: 4 },
  { name: 'San Sebastián', stateId: 4 },
  { name: 'Turmero', stateId: 4 },
  { name: 'Villa de Cura', stateId: 4 }
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
