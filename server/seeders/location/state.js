const regions = require("./region.js")
const states = [
    {
        id: '1', 
        name: 'Amazonas', 
        regionId: regions.filter(region => region.name === 'Guayana')[0].id,
        
    },
    {
        id: '2', 
        name: 'Anzoátegui', 
        regionId: regions.filter(region => region.name === 'Oriente')[0].id,
    },
    {
        id: '3', 
        name: 'Apure', 
        regionId: regions.filter(region => region.name === 'Los Llanos')[0].id,
    },
    {
        id: '4', 
        name: 'Aragua', 
        regionId: regions.filter(region => region.name === 'Central')[0].id,
    },
    {
        id: '5', 
        name: 'Barinas', 
        regionId: regions.filter(region => region.name === 'Centro Occidente')[0].id,
    },
    {
        id: '6', 
        name: 'Bolívar', 
        regionId: regions.filter(region => region.name === 'Guayana')[0].id,
    },
    {
        id: '7', 
        name: 'Carabobo', 
        regionId: regions.filter(region => region.name === 'Central')[0].id,
    },
    {
        id: '8', 
        name: 'Cojedes', 
        regionId: regions.filter(region => region.name === 'Central')[0].id,
    },
    {
        id: '9', 
        name: 'Delta Amacuro', 
        regionId: regions.filter(region => region.name === 'Guayana')[0].id,
    },
    {
        id: '10',
         name: 'Distrito Capital', 
         regionId: regions.filter(region => region.name === 'Capital')[0].id,
    },
    {
        id: '11',
         name: 'Falcón', 
         regionId: regions.filter(region => region.name === 'Occidente')[0].id,
    },
    {
        id: '12',
         name: 'Guárico', 
         regionId: regions.filter(region => region.name === 'Los Llanos')[0].id,
    },
    {
        id: '13',
         name: 'Lara', 
         regionId: regions.filter(region => region.name === 'Centro Occidente')[0].id,
    },
    {
        id: '14',
         name: 'Mérida', 
         regionId: regions.filter(region => region.name === 'Los Andes')[0].id,
    },
    {
        id: '15',
         name: 'Miranda', 
         regionId: regions.filter(region => region.name === 'Capital')[0].id,
        },
    {
        id: '16',
         name: 'Monagas', 
         regionId: regions.filter(region => region.name === 'Oriente')[0].id,
        },
    {
        id: '17',
         name: 'Nueva Esparta', 
         regionId: regions.filter(region => region.name === 'Insular')[0].id,
    },
    {
        id: '18',
         name: 'Portuguesa', 
         regionId: regions.filter(region => region.name === 'Centro Occidente')[0].id,
    },
    {
        id: '19',
         name: 'Sucre', 
         regionId: regions.filter(region => region.name === 'Oriente')[0].id,
    },
    {
        id: '20',
         name: 'Táchira', 
         regionId: regions.filter(region => region.name === 'Los Andes')[0].id,
    },
    {
        id: '21',
         name: 'Trujillo', 
         regionId: regions.filter(region => region.name === 'Los Andes')[0].id,
    },
    {
        id: '22',
         name: 'Vargas', 
         regionId: regions.filter(region => region.name === 'Capital')[0].id,
    },
    {
        id: '23',
         name: 'Yaracuy', 
         regionId: regions.filter(region => region.name === 'Centro Occidente')[0].id,
    },
    {
        id: '24',
         name: 'Zulia', 
         regionId: regions.filter(region => region.name === 'Occidente')[0].id,
    }
  ]

  module.exports = states