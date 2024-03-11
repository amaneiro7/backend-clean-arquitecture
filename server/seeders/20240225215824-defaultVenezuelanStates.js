'use strict';
const states = [
  {id: 1, name: 'Amazonas', regionId: 1},
  {id: 2, name: 'Anzoátegui', regionId: 1},
  {id: 3, name: 'Apure', regionId: 1},
  {id: 4, name: 'Aragua', regionId: 1},
  {id: 5, name: 'Barinas', regionId: 1},
  {id: 6, name: 'Bolívar', regionId: 1},
  {id: 7, name: 'Carabobo', regionId: 1},
  {id: 8, name: 'Cojedes', regionId: 1},
  {id: 9, name: 'Delta Amacuro', regionId: 1},
  {id: 10, name: 'Distrito Capital', regionId: 1},
  {id: 11, name: 'Falcón', regionId: 1},
  {id: 12, name: 'Guárico', regionId: 1},
  {id: 13, name: 'Lara', regionId: 1},
  {id: 14, name: 'Mérida', regionId: 1},
  {id: 15, name: 'Miranda', regionId: 1},
  {id: 16, name: 'Monagas', regionId: 1},
  {id: 17, name: 'Nueva Esparta', regionId: 1},
  {id: 18, name: 'Portuguesa', regionId: 1},
  {id: 19, name: 'Sucre', regionId: 1},
  {id: 20, name: 'Táchira', regionId: 1},
  {id: 21, name: 'Trujillo', regionId: 1},
  {id: 22, name: 'Vargas', regionId: 1},
  {id: 23, name: 'Yaracuy', regionId: 1},
  {id: 24, name: 'Zulia', regionId: 1}
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('states', states.map(({ name, regionId }) => ({
      id,
      region_id: regionId,
      name: name
    })), {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('states', null, {})
  }
};
