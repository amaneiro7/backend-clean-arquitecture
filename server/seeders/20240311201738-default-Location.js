'use strict';

const location = [
  {id: 1, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Lobby', subnet: '10.0.10.0'},
  {id: 2, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 1', subnet: '10.0.11.0'},
  {id: 3, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 2', subnet: '10.0.12.0'},
  {id: 4, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 3', subnet: '10.0.13.0'},
  {id: 5, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 4', subnet: '10.0.14.0'},
  {id: 6, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 5', subnet: '10.0.15.0'},
  {id: 7, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 6', subnet: '10.0.16.0'},
  {id: 8, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 7', subnet: '10.0.17.0'},
  {id: 9, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 8', subnet: '10.0.18.0'},
  {id: 10, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 9', subnet: '10.0.19.0'},
  {id: 11, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 10', subnet: '10.0.20.0'},
  {id: 12, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 11', subnet: '10.0.21.0'},
  {id: 13, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 12', subnet: '10.0.21.0'},
  {id: 14, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 13', subnet: '10.0.21.0'},
  {id: 15, typeOfSiteId: 1, siteId: 1, name: 'Torre BNC Piso 13', subnet: '10.0.21.0'},
  {id: 16, typeOfSiteId: 3, siteId: 1, name: 'Torre BNC Almacen Piso 1', subnet: null},
  {id: 17, typeOfSiteId: 2, siteId: 1, name: 'Agencia (125) Maracaibo 5 de Julio', subnet: '10.84.125.0'},
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('locations', location.map(({id, typeOfSiteId, siteId, name, subnet}) => ({
    id,
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
