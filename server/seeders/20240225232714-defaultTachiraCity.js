'use strict';

const cities = [  
  { name: 'San Antonio', stateId: 20 },
  { name: 'San Cristóbal', stateId: 20 },
  
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