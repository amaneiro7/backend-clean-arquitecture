'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkUpdate('categories', {
      main_category_id: '5'
    }, {
      id: '6'
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkUpdate('categories', {
      main_category_id: '3'
    }, {
      id: '6'
    })
  }
};
