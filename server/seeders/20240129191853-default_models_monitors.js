'use strict';

const { randomUUID } = require('crypto');

console.log(randomUUID())

const modelPrinter = [
  { 
    id: '97306e00-0f7a-49d6-bc89-65b3944d15ad', 
    name: 'HighPrint 4915', 
    categoryId: 6, 
    brandId: '6b4b6a1f-e938-47fe-b637-c4402625b6cd'
  },
  { 
    id: '162468dc-73a4-4e9c-9925-721392b245d2', 
    name: 'HighPrint 4915+', 
    categoryId: 6, 
    brandId: '6b4b6a1f-e938-47fe-b637-c4402625b6cd'
  },
  { 
    id: '1739931e-7808-443e-a895-a74d4e65ac90', 
    name: 'HighPrint 4915xe', 
    categoryId: 6, 
    brandId: '6b4b6a1f-e938-47fe-b637-c4402625b6cd'
  },
  { 
    id: '5ec89698-be12-4526-b7ad-dbdab5849e71', 
    name: 'Olivetti PR2', 
    categoryId: 6, 
    brandId: 'c06794db-6ce9-4b33-8001-f9e4735d066b'
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('models', modelPrinter.map(({id, name, categoryId, brandId}) => ({
      id,
      name,
      category_Id: categoryId,
      brand_id: brandId,
      created_at: new Date(),
      updated_at: new Date()
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('models', null, {})
  }
};
