'use strict';

const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
        id: '4a9c8e24-58b3-4cf7-b7a1-db67d4f11d07',
        email: 'admin@bnc.com.ve',
        name: 'admin',
        last_name: 'admin',
        role: 'Admin',
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      }])
  },  

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
};
