'use strict';
const { randomUUID } = require('node:crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('brands', [
      {
          id: "56a07947-0a09-488b-a597-64ef3e365c32",
          name: "Hewlett-Packard",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "b2eb94d1-4860-4e2c-95e3-b67317df8448",
          name: "IBM",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "8eea3327-4b72-4954-98af-effcd7bc9c35",
          name: "Acer",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "412c0a12-1642-4ce7-a95e-e038cd1e6ed6",
          name: "Lenovo",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "b867d236-d223-4881-a8ef-a5f554df2050",
          name: "Siragon",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "8aecf369-ba1b-4ca2-bf4b-636013caacdc",
          name: "Dell",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "1a2b2a07-0b0a-4bb8-a824-f046b1ee378c",
          name: "Hitachi",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "449021a8-ab13-4738-a303-7a4754ecc5a4",
          name: "WesternDigital",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "285b4361-baa2-434b-8ac2-942f86a15ee4",
          name: "LG",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "5d669522-ef76-4a78-a6ce-7fa4237f4c6e",
          name: "Apple",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "421bd0fd-a7b9-4e93-bef3-eda0844fc43b",
          name: "Samsung",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "1e143627-534d-4747-9bda-37ad4e2abb16",
          name: "Microsoft",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "843f8944-53fc-417f-8f7a-fe0621bc4c4a",
          name: "Sony",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "0a6c6c47-8291-4a99-aa20-85e6cb48d569",
          name: "Toshiba",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "984d5312-0170-4385-9edc-99f34cde6c9a",
          name: "Intel",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "1598ff33-f4b1-49c3-8288-fea621ff4b1d",
          name: "Nvidia",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "13be5b27-493a-4de8-b4ac-1106a6376e1b",
          name: "AMD",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "9b8e9608-a3d7-4d52-b0b7-f6ef1d9280f6",
          name: "Cisco",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "723fe859-8d6e-41df-a69f-0eed90c50aaf",
          name: "Logitech",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "76b16337-2c12-4e27-8391-94af4da88f41",
          name: "Panasonic",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "3bb7649c-d1cf-4866-a866-a02cd4702941",
          name: "Epson",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "6b4b6a1f-e938-47fe-b637-c4402625b6cd",
          name: "Wincor-Nixdorf",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "c06794db-6ce9-4b33-8001-f9e4735d066b",
          name: "Olivetti",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "a3133903-e6b2-43d3-8739-eaa730798c5a",
          name: "Seagate",
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: "805074f3-b63a-4008-80db-200897a2f899",
          name: "Kingston",
          created_at: new Date(),
          updated_at: new Date()
      }
  ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('brands', null, {})
  }
};
