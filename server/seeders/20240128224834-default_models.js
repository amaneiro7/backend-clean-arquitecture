'use strict';
const { randomUUID } = require('node:crypto')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('models', [
      {
        id: randomUUID(),
        name: 'M70e',
        category_id: 1,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'M71e',
        category_id: 1,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'M72e',
        category_id: 1,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'M73z',
        category_id: 4,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'C260',
        category_id: 4,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'M700',
        category_id: 1,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'M91p',
        category_id: 1,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'M81',
        category_id: 1,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'AD4',
        category_id: 1,
        brand_id: '2c1a7a6b-5c73-4910-81dd-4f74bd932489',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Latitude 5300',
        category_id: 3,
        brand_id: '1f8925f6-8902-4372-931c-9c01c8e61f3f',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Latitude 5400',
        category_id: 3,
        brand_id: '1f8925f6-8902-4372-931c-9c01c8e61f3f',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Compaq Elite 8300 SFF',
        category_id: 1,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Compaq Pro 4300 SFF PC',
        category_id: 1,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Compaq Pro 6300 SFF',
        category_id: 1,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Compaq 6000 Pro SFF PC',
        category_id: 1,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Compaq 6200 Pro SFF PC',
        category_id: 1,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Compaq dc5700 Small Form Factor',
        category_id: 1,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Compaq dc5800 Small Form Factor',
        category_id: 1,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP EliteBook 8470p',
        category_id: 3,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP EliteBook x360 1030 G3',
        category_id: 3,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP EliteBook x360 830 G6',
        category_id: 3,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP Laptop 15t dy200',
        category_id: 3,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'HP ProBook 4440s',
        category_id: 3,
        brand_id: '8267160b-f45f-4bce-ba57-49744e100e1b',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('models', null, {})
  }
};
