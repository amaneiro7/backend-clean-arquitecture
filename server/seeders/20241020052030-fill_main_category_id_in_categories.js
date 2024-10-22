'use strict';

const categoryData = [
  { id: '1', name: 'Computadoras', mainCategoryId: '1' },
  { id: '2', name: 'Servidores', mainCategoryId: '1' },
  { id: '3', name: 'Laptops', mainCategoryId: '1' },
  { id: '4', name: 'All in One', mainCategoryId: '1' },
  { id: '5', name: 'Monitores', mainCategoryId: '2' },
  { id: '6', name: 'Impresoras Financieras', mainCategoryId: '3' },
  { id: '7', name: 'Impresoras Laser', mainCategoryId: '3' },
  { id: '8', name: 'Impresoras Tinta', mainCategoryId: '3' },
  { id: '13', name: 'Impresoras Multifuncionales', mainCategoryId: '3' }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for await (const category of categoryData) {
      queryInterface.bulkUpdate('categories', {
        main_category_id: category.mainCategoryId
      }, {
        id: category.id
      })
    }
  },

  async down (queryInterface, Sequelize) {
    for await (const category of categoryData) {
      queryInterface.bulkUpdate('categories', {
        main_category_id: null
      }, {
        id: category.id
      })
    }
  }
};
