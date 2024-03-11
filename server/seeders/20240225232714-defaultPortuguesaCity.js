'use strict';

const cities = [  
  { name: 'Acarigua', stateId: 18 },
  { name: 'Acarigua-Anaure', stateId: 18 },
  { name: 'Guanare', stateId: 18 },
  { name: 'Turén', stateId: 18 },
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
