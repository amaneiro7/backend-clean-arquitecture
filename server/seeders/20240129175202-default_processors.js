'use strict';

const { randomUUID } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('processors', [
      {
          id: "a267cc70-f597-4e91-9330-003a89e19240",
          name: "11th Gen Intel(R) Core(TM) i7 1165G7 @ 2.80GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "37a5fc25-5261-4d35-b6a9-ec5d9b9bb6a9",
          name: "Intel(R) Celeron(R) CPU  J1800  @ 2.41GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "b3a3224c-9b77-4653-944f-bc991e411917",
          name: "Intel(R) Core(TM) i3 2100 CPU @ 3.10GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "42081811-67fa-497b-9c54-ccb473a50ed4",
          name: "Intel(R) Core(TM) i3 2120 CPU @ 3.30GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "23ea3171-0163-4235-9061-5e199523bca3",
          name: "Intel(R) Core(TM) i3 2130 CPU @ 3.40GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "c7d515bf-7419-4ba4-a6fc-4ecfb786e6fd",
          name: "Intel(R) Core(TM) i3 2370M CPU @ 2.40GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "9ad9a6a8-9906-415b-bfe6-e5231d8fbe8b",
          name: "Intel(R) Core(TM) i3 3110M CPU @ 2.40GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "ea6d8d8e-7cee-42fb-82be-6ffbad0379af",
          name: "Intel(R) Core(TM) i3 3120M CPU @ 2.50GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "0a787f22-2325-49a5-b7c6-8446a3abdab0",
          name: "Intel(R) Core(TM) i3 3220 CPU @ 3.30GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "de2af95c-f81e-4555-aa14-18269537212d",
          name: "Intel(R) Core(TM) i3 4150 CPU @ 3.50GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "8778d460-5f17-4adb-904d-1124585f3e44",
          name: "Intel(R) Core(TM) i3 CPU M 380  @ 2.53GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "d22300a0-a7bb-4223-a86b-cda9b4e628bf",
          name: "Intel(R) Core(TM) i3-3120M CPU @ 2.50GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "1229f9dd-9039-45b9-8eef-e1ac7a4aeef4",
          name: "Intel(R) Core(TM) i5 2400 CPU @ 3.10GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "19aa5315-38d6-4a16-a755-eb7bd9f91593",
          name: "Intel(R) Core(TM) i5 3210M CPU @ 2.50GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "8ebe5645-8c29-4498-9f2e-ad1c8034e8ce",
          name: "Intel(R) Core(TM) i5 3230M CPU @ 2.60GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "ebeb94f8-c476-4ddc-829f-5bca0f8d211e",
          name: "Intel(R) Core(TM) i5 3470 CPU @ 3.20GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "e55d3e4b-60e2-49bb-ada9-fa73ffa8d0ec",
          name: "Intel(R) Core(TM) i5 4430S CPU @ 2.70GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "f16ad44a-52cf-48af-851e-a267a541ec07",
          name: "Intel(R) Core(TM) i5 4460  CPU @ 3.20GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "0d00997d-c5dd-4e35-96cd-26c34d087edb",
          name: "Intel(R) Core(TM) i5 4590 CPU @ 3.30GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "d6605993-3dc4-4790-ba01-05a8795077fe",
          name: "Intel(R) Core(TM) i5 8365U CPU @ 1.60GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "12991195-1133-4753-a3b3-c78fa65496bb",
          name: "Intel(R) Core(TM) i7 7600U CPU @ 2.80GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "c4e89235-6849-478e-8148-1e7b49fe5673",
          name: "Intel(R) Core(TM) i7 8550U CPU @ 1.80GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "7e2de7e3-82e5-48a8-8f73-8a3e68f5bc32",
          name: "Intel(R) Core(TM) i7 8565U CPU @ 1.80GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "9d242eff-d34d-40c5-9feb-f52ab1b91ec7",
          name: "Intel(R) Core(TM) i7 8650U CPU @ 1.90GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "dcef0870-35cf-4900-8404-7c78bc975d73",
          name: "Intel(R) Core(TM) i7 8665U CPU @ 1.90GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "7917eafc-83ff-4866-be19-7072adfea1ee",
          name: "Intel(R) Core(TM)2 Duo CPU E4600  @ 2.40GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "ae641ecb-838a-45bb-8d30-9a2df9a4560f",
          name: "Intel(R) Core(TM)2 Duo CPU E7500  @ 2.93GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "ba77275f-6e39-465e-a5eb-810c6aa58b36",
          name: "Intel(R) Pentium(R) D CPU 2.80GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "3ad56003-fb41-469a-b5e7-efa8df50a337",
          name: "Intel(R) Pentium(R) D CPU 3.40GHz",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "e7bcb9c9-e843-42f2-98a0-7010e8ce7473",
          name: "Intel(R) Xeon(R) CPU E3 1230 V2 @ 3.30GHz",
          created_at: new Date(),
          updated_at: new Date()
      }
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('processors', null, {})
  }
};
