'use strict';

const regions = [
    {id: 1, name: 'Capital'},
    {id: 2, name: 'Central'},
    {id: 3, name: 'Los Llanos'},
    {id: 4, name: 'Centro Occidente'},
    {id: 5, name: 'Los Andes'},
    {id: 6, name: 'Occidente'},
    {id: 7, name: 'Oriente'},
    {id: 8, name: 'Guayana'},
    {id: 9, name:  'Insular'},
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('regions', regions.map(({id, name})=> ({
      id,
      name
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('regions', null, {})
  }
};
