'use strict';

const { randomUUID } = require('crypto');

const processors = [
    {id: "a267cc70-f597-4e91-9330-003a89e19240", product_collection: "Intel(R) Core(TM)",  number_model: "i7-1165G7", frequency: "2.80GHz", cores: 4, threads: true },
    {id: "37a5fc25-5261-4d35-b6a9-ec5d9b9bb6a9", product_collection: "Intel(R) Celeron(R)", number_model: "J1800", frequency: "2.41GHz", cores: 2, threads: false },
    {id: "b3a3224c-9b77-4653-944f-bc991e411917", product_collection: "Intel(R) Core(TM)", number_model: "i3-2100", frequency: "3.10GHz", cores: 2, threads: true },
    {id: "42081811-67fa-497b-9c54-ccb473a50ed4", product_collection: "Intel(R) Core(TM)", number_model: "i3-2120", frequency: "3.30GHz", cores: 2, threads: true },
    {id: "23ea3171-0163-4235-9061-5e199523bca3", product_collection: "Intel(R) Core(TM)", number_model: "i3-2130", frequency: "3.40GHz", cores: 2, threads: true },
    {id: "c7d515bf-7419-4ba4-a6fc-4ecfb786e6fd", product_collection: "Intel(R) Core(TM)", number_model: "i3-2370M", frequency: "2.40GHz", cores: 2, threads: true },
    {id: "9ad9a6a8-9906-415b-bfe6-e5231d8fbe8b", product_collection: "Intel(R) Core(TM)", number_model: "i3-3110M", frequency: "2.40GHz", cores: 2, threads: true },
    {id: "ea6d8d8e-7cee-42fb-82be-6ffbad0379af", product_collection: "Intel(R) Core(TM)", number_model: "i3-3120M", frequency: "2.50GHz", cores: 2, threads: true },
    {id: "0a787f22-2325-49a5-b7c6-8446a3abdab0", product_collection: "Intel(R) Core(TM)", number_model: "i3-3220", frequency: "3.30GHz", cores: 2, threads: true },
    {id: "de2af95c-f81e-4555-aa14-18269537212d", product_collection: "Intel(R) Core(TM)", number_model: "i3-4150", frequency: "3.50GHz", cores: 4, threads: false },
    {id: "8778d460-5f17-4adb-904d-1124585f3e44", product_collection: "Intel(R) Core(TM)", number_model: "i3-M380", frequency: "2.53GHz", cores: 2, threads: true },
    {id: "1229f9dd-9039-45b9-8eef-e1ac7a4aeef4", product_collection: "Intel(R) Core(TM)", number_model: "i5-2400", frequency: "3.10GHz", cores: 4, threads: false },
    {id: "19aa5315-38d6-4a16-a755-eb7bd9f91593", product_collection: "Intel(R) Core(TM)", number_model: "i5-3210M", frequency: "2.50GHz", cores: 2, threads: true },
    {id: "8ebe5645-8c29-4498-9f2e-ad1c8034e8ce", product_collection: "Intel(R) Core(TM)", number_model: "i5-3230M", frequency: "2.60GHz", cores: 2, threads: true },
    {id: "ebeb94f8-c476-4ddc-829f-5bca0f8d211e", product_collection: "Intel(R) Core(TM)", number_model: "i5-3470", frequency: "3.20GHz", cores: 4, threads: false },
    {id: "e55d3e4b-60e2-49bb-ada9-fa73ffa8d0ec", product_collection: "Intel(R) Core(TM)", number_model: "i5-4430S", frequency: "2.70GHz", cores: 4, threads: false },
    {id: "f0788dd7-ae62-48b7-9ef2-d5455adaeadc", product_collection: "Intel(R) Core(TM)", number_model: "i5-6400", frequency: "2.70GHz", cores: 4, threads: false },
    {id: "f16ad44a-52cf-48af-851e-a267a541ec07", product_collection: "Intel(R) Core(TM)", number_model: "i5-4460",frequency: "3.20GHz", cores: 4, threads: false },
    {id: "0d00997d-c5dd-4e35-96cd-26c34d087edb", product_collection: "Intel(R) Core(TM)", number_model: "i5-4590", frequency: "3.30GHz", cores: 4, threads: false },
    {id: "d6605993-3dc4-4790-ba01-05a8795077fe", product_collection: "Intel(R) Core(TM)", number_model: "i5-8365U", frequency: "1.60GHz", cores: 4, threads: true },
    {id: "12991195-1133-4753-a3b3-c78fa65496bb", product_collection: "Intel(R) Core(TM)", number_model: "i7-7600U", frequency: "2.80GHz", cores: 2, threads: true },
    {id: "c4e89235-6849-478e-8148-1e7b49fe5673", product_collection: "Intel(R) Core(TM)", number_model: "i7-8550U", frequency: "1.80GHz", cores: 4, threads: true },
    {id: "7e2de7e3-82e5-48a8-8f73-8a3e68f5bc32", product_collection: "Intel(R) Core(TM)", number_model: "i7-8565U", frequency: "1.80GHz", cores: 4, threads: true },
    {id: "9d242eff-d34d-40c5-9feb-f52ab1b91ec7", product_collection: "Intel(R) Core(TM)", number_model: "i7-8650U ", frequency: "1.90GHz", cores: 4, threads: true },
    {id: "dcef0870-35cf-4900-8404-7c78bc975d73", product_collection: "Intel(R) Core(TM)", number_model: "i7-8665U", frequency: "1.90GHz", cores: 4, threads: true },
    {id: "7917eafc-83ff-4866-be19-7072adfea1ee", product_collection: "Intel(R) Core(TM)2 Duo", number_model: "E4600", frequency: "2.40GHz", cores: 2, threads: false },
    {id: "ae641ecb-838a-45bb-8d30-9a2df9a4560f", product_collection: "Intel(R) Core(TM)2 Duo", number_model: "E7500", frequency: "2.93GHz", cores: 2, threads: false },
    {id: "731b7cc5-5a97-47b2-898e-320a4001dffb", product_collection: "Intel(R) Core(TM)2 Duo", number_model: "G630", frequency: "2.70GHz", cores: 2, threads: false },
    {id: "7f3ad88a-6ba7-46c9-93c8-b527fa47d444", product_collection: "Intel(R) Core(TM)2 Duo", number_model: "G620", frequency: "2.60GHz", cores: 2, threads: false },
    {id: "f17b4901-346a-4099-889b-4e46b804755a", product_collection: "Intel(R) Pentium(R) Dual", number_model: "E2180", frequency: "2.00GHz", cores: 2, threads: false },    
    {id: "ba77275f-6e39-465e-a5eb-810c6aa58b36", product_collection: "Intel(R) Pentium(R) D", number_model: "915", frequency: "2.80GHz", cores: 2, threads: false },
    {id: "3ad56003-fb41-469a-b5e7-efa8df50a337", product_collection: "Intel(R) Pentium(R) D", number_model: "945", frequency: "3.40GHz", cores: 2, threads: false },
    {id: "e7bcb9c9-e843-42f2-98a0-7010e8ce7473", product_collection: "Intel(R) Xeon(R)", number_model: "E3-1230 V2", frequency: "3.30GHz", cores: 4, threads: true },
]

/**type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('processors', processors.map(({id, product_collection, number_model, frequency, cores, threads}) => {
      return {
        id,
        product_collection,
        number_model,
        frequency,
        cores,
        threads,
        name: `${product_collection} ${number_model} CPU @ ${frequency}`, 
        created_at: new Date(),
        updated_at: new Date()
      }
    }))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('processors', null, {})
  }
};
