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
        name: 'Monitores',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        name: 'Impresora Laser',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        name: 'Impresoras Financieras',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        name: 'Impresoras de TDD',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        name: 'Escaner de Cheques',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        name: 'Discos Duros',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        name: 'Memorias RAM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 9,
        name: 'CD-ROM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 10,
        name: 'Teclados',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 11,
        name: 'Mouses',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 12,
        name: 'Reguladores',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {})
  }
};
