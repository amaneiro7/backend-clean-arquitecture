'use strict';

const cities = [  
  { name: 'Carúpano', stateId: 19 },
  { name: 'Casanay', stateId: 19 } ,
  { name: 'Cumaná', stateId: 19 } ,
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
