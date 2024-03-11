'use strict';

const cities = [  
  { name: 'Cabimas', stateId: 24 },
  { name: 'Caja Seca', stateId: 24 },
  { name: 'Carrasquero', stateId: 24 },
  { name: 'Ciudad Ojeda', stateId: 24 },
  { name: 'La Concepción', stateId: 24 },
  { name: 'Lagunillas', stateId: 24 },
  { name: 'Machiques', stateId: 24 },
  { name: 'Maracaibo', stateId: 24 },
  { name: 'Mene Grande', stateId: 24 },
  { name: 'Puertos de Altagracia', stateId: 24 },
  { name: 'San Francisco Maracaibo', stateId: 24 },
  { name: 'San Rafael del Moján', stateId: 24 },
  { name: 'Santa Bárbara del Zulia', stateId: 24 },
  { name: 'Santa Rita', stateId: 24 },
  { name: 'Villa del Rosario', stateId: 24 },
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
