'use strict';

const cities = [  
  { name: 'Juan Griego', stateId: 17 },
  { name: 'Pampatar', stateId: 17 },
  { name: 'Porlamar', stateId: 17 }  
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
