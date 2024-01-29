'use strict';

const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('processors', [
      {
        id: randomUUID(),
        name: '11th Gen Intel(R) Core(TM) i7 1165G7 @ 2.80GHz',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: randomUUID(),
        name: 'Intel(R) Celeron(R) CPU  J1800  @ 2.41GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 2100 CPU @ 3.10GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 2120 CPU @ 3.30GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 2130 CPU @ 3.40GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 2370M CPU @ 2.40GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 3110M CPU @ 2.40GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 3120M CPU @ 2.50GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 3220 CPU @ 3.30GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 4150 CPU @ 3.50GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3 CPU M 380  @ 2.53GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i3-3120M CPU @ 2.50GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 2400 CPU @ 3.10GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 3210M CPU @ 2.50GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 3230M CPU @ 2.60GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 3470 CPU @ 3.20GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 4430S CPU @ 2.70GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 4460  CPU @ 3.20GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 4590 CPU @ 3.30GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i5 8365U CPU @ 1.60GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i7 7600U CPU @ 2.80GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i7 8550U CPU @ 1.80GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i7 8565U CPU @ 1.80GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i7 8650U CPU @ 1.90GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM) i7 8665U CPU @ 1.90GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM)2 Duo CPU E4600  @ 2.40GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Core(TM)2 Duo CPU E7500  @ 2.93GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Pentium(R) D CPU 2.80GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Pentium(R) D CPU 3.40GHz',
        created_at: new Date(),
        updated_at: new Date()

      },
      {
        id: randomUUID(),
        name: 'Intel(R) Xeon(R) CPU E3 1230 V2 @ 3.30GHz',
        created_at: new Date(),
        updated_at: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('processors', null, {})
  }
};
