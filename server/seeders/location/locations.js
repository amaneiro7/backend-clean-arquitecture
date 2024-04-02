const sites = require("./sites")
const typeOfSite = require("./typeOfSite")

const location = [
    {id: 'b72b6168-440f-42c0-8d53-3f0c6ca850d5', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Lobby', subnet: '10.0.10.0'},
    {id: '4d186cc3-a7e7-4ea6-9de1-22bccfbeda13', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 1', subnet: '10.0.11.0'},
    {id: 'e4bac818-d690-4a2d-9847-9d045677daf1', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 2', subnet: '10.0.12.0'},
    {id: 'e2237cf9-5de6-4cee-a0b6-57c92f8207ad', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 3', subnet: '10.0.13.0'},
    {id: 'd24379da-88f9-493c-b336-ae4a64dc579b', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 4', subnet: '10.0.14.0'},
    {id: 'aade133a-ff8b-4093-813e-251cd7cfb060', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 5', subnet: '10.0.15.0'},
    {id: '415ff29d-b076-45de-abcd-c36e083b983a', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 6', subnet: '10.0.16.0'},
    {id: '50b149e9-44c8-4bd1-a2d4-f76bd3797498', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 7', subnet: '10.0.17.0'},
    {id: '89cdbe96-9f68-4623-b1e6-4735fe9b26f1', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 8', subnet: '10.0.18.0'},
    {id: '56be6613-48a9-419d-8003-7f505c30beb1', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 9', subnet: '10.0.19.0'},
    {id: 'a50deb49-66cc-420e-8351-79e4d53cbf01', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 10', subnet: '10.0.20.0'},
    {id: '85eb0152-4196-4b80-9744-b32688202c4e', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 11', subnet: '10.0.21.0'},
    {id: '1ac38854-738e-4f43-957a-af8ae3a63efc', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 12', subnet: '10.0.21.0'},
    {id: 'd32acb33-7389-48db-b32d-6056de70c221', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 13', subnet: '10.0.21.0'},
    {id: '23ae22e1-7426-460d-97b6-c89ca0c55c9f', typeOfSiteId: typeOfSite.filter(type => type.name === 'Sede Administrativa')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Piso 13', subnet: '10.0.21.0'},
    {id: '4c1beaf2-64e3-4c3c-8e9f-ef18767d18ab', typeOfSiteId: typeOfSite.filter(type => type.name === 'Almacén')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Torre BNC Almacen Piso 1', subnet: null},
    {id: 'ff611935-6b99-4e03-b0ac-d6611284f2cb', typeOfSiteId: typeOfSite.filter(type => type.name === 'Agencia')[0].id, siteId: sites.filter(site => site.name === 'Edif Torre BNC')[0].id, name: 'Agencia (125) Maracaibo 5 de Julio', subnet: '10.84.125.0'},
  ]

  module.exports = location