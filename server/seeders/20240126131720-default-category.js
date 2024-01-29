'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [
      {
        id: 1,
        name: 'Computadoras',        
      },
      {
        id: 2,
        name: 'Servidores',        
      },
      {
        id: 3,
        name: 'Laptops',        
      },
      {
        id: 4,
        name: 'All in One',        
      },
      {
        id: 5,
        name: 'Monitores',        
      },
      {
        id: 6,
        name: 'Impresoras Financieras',        
      },
      {
        id: 7,
        name: 'Impresoras Laser',        
      },
      {
        id: 8,
        name: 'Impresoras Tinta',        
      },
      {
        id: 9,
        name: 'Discos Duros',        
      }      
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {})
  }
};
