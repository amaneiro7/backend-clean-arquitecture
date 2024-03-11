'use strict';

const cities = [  
  { name: 'Coro', stateId: 11 },
  { name: 'Dabajuro', stateId: 11 },
  { name: 'Punto FIjo', stateId: 11 }  
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
