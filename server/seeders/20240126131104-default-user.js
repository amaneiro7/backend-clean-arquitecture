'use strict';

const { hashSync } = require('bcrypt');
const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
        id: randomUUID(),
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
