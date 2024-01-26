'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Computadoras'
      },
      {
        id: 2,
        name: 'Monitores'
      },
      {
        id: 3,
        name: 'Impresora Laser'
      },
      {
        id: 4,
        name: 'Impresoras Financieras'
      },
      {
        id: 5,
        name: 'Impresoras de TDD'
      },
      {
        id: 6,
        name: 'Escaner de Cheques'
      },
      {
        id: 7,
        name: 'Discos Duros'
      },
      {
        id: 8,
        name: 'Memorias RAM'
      },
      {
        id: 9,
        name: 'CD-ROM'
      },
      {
        id: 10,
        name: 'Teclados'
      },
      {
        id: 11,
        name: 'Mouses'
      },
      {
        id: 12,
        name: 'Reguladores'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {})
  }
};
