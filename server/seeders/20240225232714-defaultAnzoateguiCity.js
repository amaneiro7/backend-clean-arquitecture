'use strict';

const cities = [  
  { name: 'Anaco', stateId: 2 },
  { name: 'Barcelona', stateId: 2 },
  { name: 'El Tigre', stateId: 2 },
  { name: 'El Tigrito', stateId: 2 },
  { name: 'Lecherias', stateId: 2 },
  { name: 'Puerto la Cruz', stateId: 2 },
  { name: 'Píritu', stateId: 2 }
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
