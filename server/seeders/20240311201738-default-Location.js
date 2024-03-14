'use strict';

const location = [
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Lobby', subnet: '10.0.10.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 1', subnet: '10.0.11.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 2', subnet: '10.0.12.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 3', subnet: '10.0.13.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 4', subnet: '10.0.14.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 5', subnet: '10.0.15.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 6', subnet: '10.0.16.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 7', subnet: '10.0.17.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 8', subnet: '10.0.18.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 9', subnet: '10.0.19.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 10', subnet: '10.0.20.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 11', subnet: '10.0.21.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 12', subnet: '10.0.21.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 13', subnet: '10.0.21.0'},
  {typeOfSiteId: 1, siteId: 240809, name: 'Torre BNC Piso 13', subnet: '10.0.21.0'},
  {typeOfSiteId: 3, siteId: 240809, name: 'Torre BNC Almacen Piso 1', subnet: null},
  {typeOfSiteId: 2, siteId: 240809, name: 'Agencia (125) Maracaibo 5 de Julio', subnet: '10.84.125.0'},
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('locations', location.map(({typeOfSiteId, siteId, name, subnet}, index) => ({
    id: siteId * 100 + index,
    type_of_site_id: typeOfSiteId,
    site_id: siteId,
    name,
    subnet
   })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('locations', null, {})
  }
};
