'use strict';
const { randomUUID } = require('node:crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('brands', [
      {
        id: randomUUID(),
        name: 'Hewlett-Packard',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'IBM',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Acer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Lenovo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Siragon',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Dell',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Hitachi',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'WesternDigital',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'LG',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Apple',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Samsung',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Microsoft',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Sony',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Toshiba',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Intel',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Nvidia',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'AMD',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Cisco',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Logitech',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Panasonic',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Epson',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Wincor-Nixdorf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Olivetti',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Seagate',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Kingston',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('brands', null, {})
  }
};
