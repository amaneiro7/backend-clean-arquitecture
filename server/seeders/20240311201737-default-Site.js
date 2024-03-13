'use strict';

const sites = [
  {cityId: 2401, address: 'Av. Principal No. 3 Edif. B.O.D', name: 'Cabimas Av. Independencia'},
  {cityId: 2401, address: 'Local LF-1 Piso 1, Av. Intercomunal, Sector la INOS al lado de Makro, Parroquia Jorge Hernández', name: 'Traki Cabimas'},
  {cityId: 2402, address: 'Carretera Panamericana, Frente A La Plaza Silsa', name: 'Caja Seca'},
  {cityId: 2403, address: 'Calle Principal Carrasquero Esq. Av. Bolívar, Frente A La Plaza Bolívar, Al Lado De La Jefatura Civil', name: 'Carrasquero'},
  {cityId: 2404, address: 'Av. Intercomunal Cabimas - Lagunillas, Edificio Zulia, Locales PB-1, PB-2, PB-3 Y PB-4', name: 'Ciudad Ojeda'},
  {cityId: 2404, address: 'Av. Bolívar Esquina Con Calle Sucre. Edificio B.O.D', name: 'Ciurdad Ojeda Centro'},
  {cityId: 2005, address: 'Av. Principal La Concepción, Sector Los Cocos', name: 'La Concepción'},
  {cityId: 2406, address: 'Sector El Menito. Edificio PDVSA. Módulo 1', name: 'El Menito'},
  {cityId: 2407, address: 'Calle Santa Teresa, Esquina Av. Bermúdez', name: 'Machiques'},
  {cityId: 2408, address: 'Calle 77 (5 De Julio) Esquina Av. 17 (Baralt)', name: 'Edif Torre BNC'},
  {cityId: 2408, address: 'Alcaldía De Maracaibo, Avenida 4 Con Calle 96, Parroquia Bolívar', name: 'Taquilla Alcaldiá de Maracaibo'},
  {cityId: 2408, address: 'Av. Circunvalación Nº 2, C.C. Babilon Centro Sur, Nº 60.240, Sector Los Estanques, Parroquia Luis Hurtado Higuera', name: 'C.C.Babilón Centro Sur'},
  {cityId: 2408, address: 'Calle 72 Esquina Av. 3G Sector La Lago', name: 'Calle 72'},
  {cityId: 2408, address: 'Calle Venezuela (Frente Al Comando De La Guardia Nacional)', name: 'Casigua'},  
  {cityId: 2408, address: 'Av. 2 El Milagro. Centro Comercial Lago Mall', name: 'Centro Lago Mall'},
  {cityId: 2408, address: 'Av. 28 (La Limpia) Con Calle 79', name: 'Curva de Molina'},
  {cityId: 2408, address: 'Av. 28 La Limpia, Antiguo Bambi, Sector Los Postes Negros', name: 'El Tránsito'},
  {cityId: 2408, address: 'Centro Comercial Galerias Mall, Nivel Pb', name: 'Galerias Mall - Mcbo'},
  {cityId: 2408, address: 'C.C. Indio Mara Av. 22 Con Calle 70, Locales 3 Al 9, Sector Indio Mara', name: 'Indio Mara'},
  {cityId: 2408, address: 'Av. Bella Vista, Esquina Av. Universidad Edificio Las Mercedes', name: 'La Limpia'},
  {cityId: 2408, address: 'Av. Bella Vista, Esquina Av. Universidad Edificio Las Mercedes', name: 'Las Mercedes'},
  {cityId: 2408, address: 'Av. 17 Los Haticos, Maracaibo', name: 'Los Haticos'},
  {cityId: 2408, address: 'Av. La Limpia, Entre Avenidas 79-A Y 79-B, Centro Comercial Ciudad Traki, Parroquia Raúl Leoni', name: 'Maracaibo Av. La Limpia'},
  {cityId: 2408, address: 'Avenida Las Delicias, Cruce Con Avenida Libertador, Ciudad De Maracaibo, Parroquia Bolívar', name: 'Maracaibo C.C. Gran Bazar'},
  {cityId: 2408, address: 'Av. 4 (Bella Vista) Entre Calles 79 Y 80', name: 'Maracaibo II Bella Vista'},
  {cityId: 2408, address: 'Calle 74 (Antes Dr. Arévalo González), Entre Avenidas 3h Y 3y, Edificio 2000, Municipio Coquivacoa', name: 'Maracaibo III'},
  {cityId: 2408, address: 'Av. Las Delicias Con Calle 88, Nº 88-77, Local Nº 2, P.B., Sector Las Delicias, Municipio Maracaib', name: 'Maracaibo Las Delicias'},
  {cityId: 2408, address: 'Av. 15 Prolongación Delicias Norte, Edif. Corp Banca Frente Al C.C. Paseo Las Delicias', name: 'Maracaibo Norte'},
  {cityId: 2408, address: 'Av. Circunvalación 2, Diagonal Al Hotel Maruma, Frente A La Estación De Servicio Móvi', name: 'Maracaibo Zona Industrial'},
  {cityId: 2408, address: 'Vía Palíto Blanco, Mercado De Mayorista', name: 'Mercamara'},
  {cityId: 2408, address: 'Av. 2 El Milagro. Centro Comercial Lago Mall', name: 'Nautico'},
  {cityId: 2408, address: 'Av 2 El Milagro Puerto De Maracaibo, Parroquia Santa Lucia', name: 'Puerto de Maracaibo'},
  {cityId: 2408, address: 'Av. Principal Sabaneta, Centro Comercial Centro Del Sol', name: 'Sabaneta'},
  {cityId: 2408, address: 'Av. Guajira, Centro Sambil Maracaibo, Nivel Lago, Entrada Guajira, Locales L1 Y L2', name: 'Sambil Maracaibo'},
  {cityId: 2408, address: 'Circunvalación No. 2, Centro Comercial Ogaret Shopping Center', name: 'San Miguel'},  
  {cityId: 2409, address: 'Av. Independencia, Diagonal A La Guardia Nacional, Centro Comercial Petrolero', name: 'Mene Grande'},
  {cityId: 2410, address: 'Av. 6 Con Prolongación Calle 6', name: 'Puertos de Altagracia'},
  {cityId: 2411, address: 'El Samán Entre Los Km. 9 Y 11, con Av. 50 Con Calle 200 De La Urbanización El Caujaro', name: 'El Saman'},
  {cityId: 2412, address: 'Av. 7 (Principal) Con Calle 24', name: 'El Moján'},
  {cityId: 2413, address: 'Av. Bolívar Santa Bárbara', name: 'Santa Bárbara'},
  {cityId: 2414, address: 'Av. Pedro Lucas Urribarri, Sede De La Alcaldía Del Municipio Santa Rita', name: 'Santa Rita'},
  {cityId: 2415, address: 'Calle Donaldo Blanco Garcia, Entre Calles Municipal Y Concepción', name: 'Villa del Rosario'}  
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('sites', sites.map(({cityId, address, name}, index) => ({
    id: cityId * 100 + index,
    city_id: cityId,
    address,
    name
   })))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('sites', null, {})
  }
};
