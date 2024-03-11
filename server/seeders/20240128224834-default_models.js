'use strict';
const { randomUUID } = require('node:crypto')

const models = [
    { id: "21969859-daa0-4916-a554-edff77e8f9ac", name: "M70e", category_id: 1, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "83c38f9b-a0ac-4350-9204-886ea8e4e967", name: "M71e", category_id: 1, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "9b43fe74-aa96-477e-8a25-cf3506742ccd", name: "M72e", category_id: 1, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "5da772a9-0e01-4689-9afb-717ccf68cf3f", name: "M73z", category_id: 4, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "4096012f-bed6-4975-a17c-6496c5573785", name: "C260", category_id: 4, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "1aa81dee-015b-4999-80f5-a5ecac793bca", name: "M700", category_id: 1, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "ba260f98-0042-4be7-9d9d-1c6dca5010c3", name: "M91p", category_id: 1, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "ec9e560a-318d-42a7-85cb-ad6fc08e57d9", name: "M81", category_id: 1, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "c11d727c-f6b7-4ddf-a597-a6b1c1d06c1c", name: "AD4", category_id: 1, brand_id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6" },
    { id: "eeb3420d-a6b8-4c0f-bcc8-048707ecc758", name: "Latitude 5300", category_id: 3, brand_id: "8aecf369-ba1b-4ca2-bf4b-636013caacdc" },
    { id: "24a4ae7d-8570-45f3-b103-ea35a0f7c43c", name: "Latitude 5400", category_id: 3, brand_id: "8aecf369-ba1b-4ca2-bf4b-636013caacdc" },
    { id: "cdfd08c0-59d0-4bfc-a021-e6d53e1325fc", name: "HP Compaq Elite 8300 SFF", category_id: 1, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "b67c290e-c186-4ab7-9fd3-92689e1bcbaa", name: "HP Compaq Pro 4300 SFF PC", category_id: 1, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "4cb2e608-5f28-44af-af75-59cb2ca2fbab", name: "HP Compaq Pro 6300 SFF", category_id: 1, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "9e376eb0-7559-41c1-82aa-36b6fa4cccf1", name: "HP Compaq 6000 Pro SFF PC", category_id: 1, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "ce51d092-332e-42ac-8b27-df7da5d3463a", name: "HP Compaq 6200 Pro SFF PC", category_id: 1, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "8145c77f-a75e-4cfa-9634-a4eb17540cde", name: "HP Compaq dc5700 Small Form Factor", category_id: 1, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "bd0b6c7d-4d17-48cd-8b61-d4a167ad588f", name: "HP Compaq dc5800 Small Form Factor", category_id: 1, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "bf10b490-f61d-4932-8bf4-05822213212d", name: "HP EliteBook 8470p", category_id: 3, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "ba8097b3-660f-4e09-a6fc-23c1e6332a90", name: "HP EliteBook x360 1030 G3", category_id: 3, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "e52f9a4b-b708-4137-8d33-ca60497cfdbf", name: "HP EliteBook x360 830 G6", category_id: 3, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "a1a929ed-1be1-46fd-9da9-e7207b4f3dbc", name: "HP Laptop 15t dy200", category_id: 3, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" },
    { id: "206ecb35-1e43-47e2-85b4-f7b6405ab638", name: "HP ProBook 4440s", category_id: 3, brand_id: "56a07947-0a09-488b-a597-64ef3e365c32" }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('models', models.map(({id, name, category_id, brand_id}) => ({
        id,
        name,
        category_id,
        brand_id,
        created_at: new Date(),
        updated_at: new Date()
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('models', null, {})
  }
};
