'use strict';
const states = {
  AMAZONAS: 'Amazonas',
  ANZOATEGUI: 'Anzoátegui',
  APURE: 'Apure',
  ARAGUA: 'Aragua',
  BARINAS: 'Barinas',
  BOLIVAR: 'Bolívar',
  CARABOBO: 'Carabobo',
  COJEDES: 'Cojedes',
  DELTAAMACURO: 'Delta Amacuro',
  DISTRITOCAPITAL: 'Distrito Capital',
  FALCON: 'Falcón',
  GUARICO: 'Guárico',
  LARA: 'Lara',
  MERIDA: 'Mérida',
  MIRANDA: 'Miranda',
  MONAGAS: 'Monagas',
  NUEVAESPARTA: 'Nueva Esparta',
  PORTUGUESA: 'Portuguesa',
  SUCRE: 'Sucre',
  TACHIRA: 'Táchira',
  TRUJILLO: 'Trujillo',
  VARGAS: 'Vargas',
  YARACUY: 'Yaracuy',
  ZULIA: 'Zulia'
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('states', Object.values(states).map((name, index) => ({
      id: index + 1,
      name
    })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('states', null, {})
  }
};
