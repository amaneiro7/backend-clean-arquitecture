'use strict';

const { randomUUID } = require('crypto');

const modelMonitor = [
  { id: "11628344-e732-4a1a-a2b7-784bd3fd7e6c", name: 'WIL-172U', categoryId: 10, brandId: "8eea3327-4b72-4954-98af-effcd7bc9c35" },
  { id: "c93ba9b4-6f31-41d1-ac78-626147e8e438", name: 'AQ6-7D20', categoryId: 10, brandId: "8aecf369-ba1b-4ca2-bf4b-636013caacdc" },
  { id: "7af7a698-206d-41bb-9a23-27cc8cdddeec", name: 'RT7D20', categoryId: 10, brandId: "8aecf369-ba1b-4ca2-bf4b-636013caacdc" },
  { id: "fa120361-cf73-4c4e-9a7e-25adef53095b", name: '49201381000A', categoryId: 10, brandId: "a0ac3c3f-2309-4ecf-961a-4dad9548b4bb" },
  { id: "9a1f0410-fdce-41cc-b94c-f4446e4f6674", name: '110', categoryId: 10, brandId: "cf7fa379-b3d7-4605-8324-026ab9835e3b" },
  { id: "3a8ae62e-cabb-442f-a626-1a03dd2b46ec", name: 'GEK-070006/U', categoryId: 10, brandId: "cf7fa379-b3d7-4605-8324-026ab9835e3b" },
  { id: "f62452c6-7be0-4227-830b-73b1b056a60a", name: 'GK-100016', categoryId: 10, brandId: "cf7fa379-b3d7-4605-8324-026ab9835e3b" },
  { id: "fac76e91-69ba-4c22-9eca-8dcba8ccc32a", name: 'K639', categoryId: 10, brandId: "cf7fa379-b3d7-4605-8324-026ab9835e3b" },
  { id: "ff9f874b-e02d-43a9-b9af-b7ba0cf93526", name: 'KB-100011', categoryId: 10, brandId: "cf7fa379-b3d7-4605-8324-026ab9835e3b" },
  { id: "de584db1-6277-43f6-ab3d-e03a3436d260", name: 'KU-0138', categoryId: 10, brandId: "cf7fa379-b3d7-4605-8324-026ab9835e3b" },
  { id: "d2501558-48bd-4bf0-b53f-5e4b7016685f", name: '3751', categoryId: 10, brandId: "56a07947-0a09-488b-a597-64ef3e365c32" },
  { id: "819e3f6c-b2c4-4801-a5be-c0f944dd480a", name: 'AR001004841', categoryId: 10, brandId: "56a07947-0a09-488b-a597-64ef3e365c32" },
  { id: "be27077a-173e-4f26-99f3-19631b78c50a", name: 'KB-0316', categoryId: 10, brandId: "56a07947-0a09-488b-a597-64ef3e365c32" },
  { id: "4d84933e-909e-4f2c-9c92-f48cd5f4fd4e", name: 'KU-0133', categoryId: 10, brandId: "56a07947-0a09-488b-a597-64ef3e365c32" },
  { id: "620f0258-e55c-476a-8c07-99f27eb8d135", name: 'KU-0316', categoryId: 10, brandId: "56a07947-0a09-488b-a597-64ef3e365c32" },
  { id: "b79754e1-e2d9-45ce-8d5d-0bd4dc311778", name: 'SK-2880', categoryId: 10, brandId: "56a07947-0a09-488b-a597-64ef3e365c32" },
  { id: "cc53838a-871c-4ff5-8748-57075fcc2f0f", name: 'KU0225', categoryId: 10, brandId: "b2eb94d1-4860-4e2c-95e3-b67317df8448" },
  { id: "9594a762-1efe-4f4f-8545-bd8b44c4664f", name: 'SK-8811', categoryId: 10, brandId: "b2eb94d1-4860-4e2c-95e3-b67317df8448" },
  { id: "7fa33d53-5084-477c-bc16-0d808312802f", name: 'KU-0225', categoryId: 10, brandId: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
  { id: "e1af1f86-f06e-44d2-a061-c78a224fbff8", name: 'KUF0452', categoryId: 10, brandId: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
  { id: "0376a794-353f-4f41-a528-1cc75d3c7ea2", name: 'LXHEKB10YA', categoryId: 10, brandId: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
  { id: "886ab92e-87f7-4003-a9ba-ffe16d9df755", name: 'SK-8825', categoryId: 10, brandId: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
  { id: "1ff07964-9314-4fc2-9767-1864dc88fa62", name: '600', categoryId: 10, brandId: "1e143627-534d-4747-9bda-37ad4e2abb16" },
  { id: "5f50882f-cf94-462d-9102-5e1bbf563291", name: '1366', categoryId: 10, brandId: "1e143627-534d-4747-9bda-37ad4e2abb16" },
  { id: "a972449b-5fd0-43b3-b6b5-66023ba7b8c8", name: 'PCK104-SKB', categoryId: 10, brandId: "9b2dffe4-9afc-474b-b1ae-5703566bef57" },  
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('models', modelMonitor.map(({id, name, categoryId, brandId}) => ({
          id,
          name,
          category_id: categoryId,
          brand_id: brandId,
          created_at: new Date(),
          updated_at: new Date()        
        })))
         
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('models', null, {})
  }
};
