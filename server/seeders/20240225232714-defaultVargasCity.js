'use strict';

const cities = [  
  { name: 'Catia la Mar', stateId: 22 },
  { name: 'La Guaira', stateId: 22 } ,
  { name: 'Naiguatá', stateId: 22 } ,
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
