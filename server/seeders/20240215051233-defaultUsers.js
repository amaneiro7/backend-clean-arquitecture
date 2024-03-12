'use strict';

const { hashSync } = require('bcrypt');
const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: randomUUID(),
        email: 'admin@bnc.com.ve',
        name: 'admin',
        last_name: 'admin',
        role_id: 1,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        email: 'cortega@bnc.com.ve',
        name: 'Carlos',
        last_name: 'Ortega',
        role_id: 4,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        email: 'apatino@bnc.com.ve',
        name: 'Anggie',
        last_name: 'Patiño',
        role_id: 3,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        email: 'jodiaz@bnc.com.ve',
        name: 'José',
        last_name: 'Diaz',
        role_id: 2,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        email: 'luferrer@bnc.com.ve',
        name: 'Luis',
        last_name: 'Ferrer',
        role_id: 2,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        email: 'krincon@bnc.com.ve',
        name: 'Kristable',
        last_name: 'Rincón',
        role_id: 2,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        email: 'anmaneiro@bnc.com.ve',
        name: 'Andrés',
        last_name: 'Maneiro',
        role_id: 2,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        email: 'lbrinez@bnc.com.ve',
        name: 'Luis',
        last_name: 'Briñez',
        role_id: 1,
        password: hashSync('Admin12345*', 10),
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },  

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
};
