'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Computadoras',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Servidores',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Laptops',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'All in One',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'Monitores',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name: 'Impresoras Financieras',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        name: 'Impresoras Laser',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        name: 'Impresoras Tinta',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        name: 'Discos Duros',
        created_at: new Date(),
        updated_at: new Date()
      }      
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {})
  }
};
