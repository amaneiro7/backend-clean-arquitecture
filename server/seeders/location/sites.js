const {cities, cityOnlyNames} = require("./cities")

const siteOnlyNames = {
  SANBERNARDINO: 'San Bernardino',
  TRAKISANMARTIN: 'Traki San Martín',
  LACANDELARIACASABERA: 'La Candelaria Casabera',
  TAQUILLAHOSPORTOPEDICOINFANTIL: 'Taquilla Hosp. Ortopédico Infantil',
  LAURBINA: 'La Urbina',
  CATIABOULEVARD: 'Catia Boulevard',
  CHARALLAVE: 'Charallave',
  CIUDADOJEDACENTRO: 'Ciudad Ojeda Centro',
  LOSTAQUESFALCON: 'Los Taques Falcón',
  SANTATERESADELTUY: 'Santa Teresa del Tuy',
  GUARENAS: 'Guarenas',
  PALONEGROSUPERLIDER: 'Palo Negro Súper Líder',
  'MARACAYCC.PLATINIUM': 'Maracay C.C. Platinium',
  SANJUANDELOSMORROS: 'San Juan de Los Morros',
  CASACOIMADELTAAMACURO: 'Casacoima Delta Amacuro',
  TUCUPIDOGUARICO: 'Tucupido Guarico',
  MARACAIBOLASDELICIAS: 'Maracaibo Las Delicias',
  TAQUILLAALCALDIADEMARACAIBO: 'Taquilla Alcaldia de Maracaibo',
  MARACAIBOIIBELLAVISTA: 'Maracaibo II Bella Vista',
  LALIMPIA: 'La Limpia',
  ELHATILLO: 'El Hatillo',
  'SANJORGE-ELCEMENTERIO': 'San Jorge - El Cementerio',
  SANCRISTOBAL: 'San Cristóbal',
  TRAKIVALLEDELAPASCUA: 'Traki Valle de la Pascua',
  SANANTONIODELOSALTOS: 'San Antonio de Los Altos',
  SANFELIX: 'San Felix',
  UNARE: 'unare',
  ALTAVISTA: 'Altavista',
  AEROPUERTOCARACAS: 'Aeropuerto Caracas',
  PARQUECRISTAL: 'Parque Cristal',
  TAQUILLACLUBHEBRAICA: 'Taquilla Club Hebraica',
  EUROBUILDING: 'Eurobuilding',
  ALTAMIRA: 'Altamira',
  SANROMAN: 'San Román',
  CENTROCOMERCIALALTOPRADO: 'Centro Comercial Alto Prado',
  'CC.CIUDADTAMANACO': 'C.C. Ciudad Tamanaco',
  LAGUAIRA: 'La Guaira',
  PLAZALASAMERICAS: 'Plaza Las Américas',
  AVVICTORIA: 'Av. Victoria',
  CAPANAPARO: 'Capanaparo',
  ACARIGUA: 'Acarigua',
  MARACAYTORRESINDONI: 'Maracay Torre Sindoni',
  CAGUASUPERLIDER: 'Cagua Súper Líder',
  SUPERLIDERELLIMON: 'Súper Líder El Limón',
  BARQUISIMETOMERCABAR: 'Barquisimeto Mercabar',
  PUERTOCABELLO: 'Puerto Cabello',
  AVPEDROLEONTORRES: 'Av. Pedro León Torres',
  CIUDADBOLIVAR: 'Ciudad Bolívar',
  VALENCIASUR: 'Valencia Sur',
  SANSEBASTIANDELOSREYES: 'San Sebastián de los Reyes',
  MARACAYLASDELICIAS: 'Maracay Las Delicias',
  MARACAYCENTRO: 'Maracay Centro',
  MARACAYSANTOSMICHELENA: 'Maracay Santos Michelena',
  MARACAYALCALDIA: 'Maracay Alcaldia',
  VALENCIABOLIVARNORTE: 'Valencia Bolívar Norte',
  CAGUA: 'Cagua',
  MARACAYLOSSAMANES: 'Maracay Los Samanes',
  VILLADECURA: 'Villa de Cura',
  MERIDALASAMERICAS: 'Merida Las Americas',
  SANANTONIODELTACHIRA: 'San Antonio del Táchira',
  LAQUIZANDA: 'La Quizanda',
  ELROSAL: 'El Rosal',
  CALABOZO: 'Calabozo',
  'MARACAIBOCC.GRANBAZAR': 'Maracaibo C.C. Gran Bazar',
  COROSUPERMERCADOEUROFALCON: 'Coro Supermercado Eurofalcon',
  PUERTOLACRUZAVALBERTORAVELL: 'Puerto La Cruz Av.Alberto Ravell',
  MARACAYAVENIDAVARGAS: 'Maracay Avenida Vargas',
  CARUPANOCCCRISTAL: 'Carúpano CC Cristal',
  'VALENCIACC.CONCEPTOLAGRANJA': 'Valencia C.C. Concepto La Granja',
  PORLAMARALCALDIAMARINO: 'Porlamar Alcaldía Mariño',
  BEJUMAAVENIDALOSFUNDADORES: 'Bejuma Avenida Los Fundadores',
  PUERTOORDAZCONTINENTAL: 'Puerto Ordaz Continental',
  ELVIGIA: 'El Vigía',
  ALCALDIACASANAY: 'Alcaldía Casanay',
  VALERA: 'Valera',
  PUNTOFIJOII: 'Punto Fijo II',
  'COROI-FALCON': 'Coro I - Falcón',
  LOSHATICOS: 'Los Haticos',
  'CC.PLANETASOTAVENTOMAIQUETIA': 'C.C. Planeta Sotavento Maiquetía',
  MARACAIBO5DEJULIO: 'Maracaibo 5 De Julio',
  VILLADELROSARIO: 'Villa Del Rosario',
  VALENCIACAMORUCO: 'Valencia Camoruco',
  VALENCIACENTRO: 'Valencia Centro',
  CIUDADBOLIVARII: 'Ciudad Bolívar II',
  CLUBLALAGUNITA: 'Club La Lagunita',
  CHORONI: 'Choroní',
  CENTROMEDICOMARACAY: 'Centro Medico Maracay',
  ZONAINDUSTRIALIIBARQUISIMETO: 'Zona Industrialii Barquisimeto',
  LOSDOSCAMINOS: 'Los Dos Caminos',
  'LAVICTORIACC.PALMACENTER': 'La Victoria C.C. Palma Center',
  'PORLAMAR-MARGARITA': 'Porlamar - Margarita',
  LASGARCITASVALENCIA: 'Las Garcitas Valencia',
  MATURINII: 'Maturin II',
  'CC.BABILONCENTROSUR': 'C.C. Babilón Centro Sur',
  LATRINIDADZONAINDUSTRIAL: 'La Trinidad Zona Industrial',
  TAQUILLACENTROITALOVENEZOLANO: 'Taquilla Centro Italo Venezolano',
  EUROBUILDINGPUERTOORDAZ: 'Eurobuilding Puerto Ordaz',
  EUROBUILDINGBARINAS: 'Eurobuilding Barinas',
  CLUBPUERTOAZUL: 'Club Puerto Azul',
  PORLAMARCENTRO: 'Porlamar Centro',
  CIUDADOJEDA: 'Ciudad Ojeda',
  CENTROCOMERCIALLOSTEQUES: 'Centro Comercial Los Teques',
  ELSOMBRERO: 'El Sombrero',
  CENTROCOMERCIALMETROPOLIS: 'Centro Comercial Metrópolis',
  SANTAMONICA: 'Santa Mónica',
  'CC.METROPOLISVALENCIA': 'C.C. Metrópolis Valencia',
  TRAKICABIMAS: 'Traki Cabimas',
  GUATIREAVINTERCOMUNAL: 'Guatire Av. Intercomunal',
  ELTIGRITO: 'El Tigrito',
  LAMORITA: 'La Morita',
  LECHERIA: 'Lecheria',
  TRAKICUMANA: 'Traki Cumaná',
  SANIGNACIO: 'San Ignacio',
  LACANDELARIACASAITALIA: 'La Candelaria Casa Italia',
  ELVINEDO: 'El Viñedo',
  MARACAIBOIII: 'Maracaibo III',
  SANFELIPE: 'San Felipe',
  BARINAS: 'Barinas',
  'CHARALLAVECC.SUPERLIDER': 'Charallave C.C. Súper Líder',
  'TURMEROCC.MARINOPLAZA': 'Turmero C. C. Mariño Plaza',
  YARITAGUAHYPERLIDER: 'Yaritagua Hyper Líder',
  SANDIEGOSUPERMERCADOHIPERLIDER: 'San Diego Supermercado Híper Líder',
  SANFERNANDODEAPURE: 'San Fernando de Apure',
  HIPERLIDERCABUDARE: 'Hiperlider Cabudare',
  SANCARLOS: 'San Carlos',
  TUCUPITATRAKI: 'Tucupita Traki',
  DABAJUROII: 'Dabajuro II',
  TRAKISANFERNANDODEAPURE: 'TRAKI San Fernando de Apure',
  CENTRORESIDENCIALSOLANO: 'Centro Residencial Solano',
  SAMBILVALENCIA: 'Sambil Valencia',
  EXCELSIORGAMASANTAFE: 'Excelsior Gama Santa Fe',
  EXCELSIORGAMASANTAEDUVIGIS: 'Excelsior Gama Santa Eduvigis',
  CCLAVINAVALENCIA: 'C.C La Viña Valencia',
  HIPERLIDERARAURE: 'Hiper Lider Araure',
  BOLEITA: 'Boleita',
  UNICENTROMARACAY: 'Unicentro Maracay',
  ANACOAVMERIDA: 'Anaco Av. Mérida',
  PUERTOPIRITU: 'Puerto PÍritu',
  BARCELONACENTRO: 'Barcelona Centro',
  ELTIGRE: 'El Tigre',
  LECHERIACENTROEMPRESARIAL: 'Lechería Centro Empresarial',
  SANFERNANDODEAPUREINTERCOMUNAL: 'San Fernando De Apure Intercomunal',
  MARACAYAVARAGUA: 'Maracay Av. Aragua',
  PALONEGROPLAZABOLIVAR: 'Palo Negro Plaza Bolívar',
  'CC.LAVICTORIA': 'C.C. La Victoria',
  LAMORITAINTERCOMUNAL: 'La Morita Intercomunal',
  ALTOBARINAS: 'Alto Barinas',
  PUERTOORDAZCASTILLITO: 'Puerto Ordaz Castillito',
  GUACARA: 'Guacara',
  TOCUYITO: 'Tocuyito',
  NAGUANAGUAAVUNIVERSIDAD: 'Naguanagua Av. Universidad',
  MONTALBAN: 'Montalbán',
  METROPLAZA: 'Metroplaza',
  SANTAROSA: 'Santa Rosa',
  SANJOSEDETARBES: 'San Jose De Tarbes',
  CANDELARIAVALENCIA: 'Candelaria Valencia',
  INSTITUTOAUTONOMOELPUERTO: 'Instituto Autonomo El Puerto',
  TINAQUILLO: 'Tinaquillo',
  AVUNIVERSIDAD: 'Av.Universidad',
  'SANMARTINCC.LOSMOLINOS': 'San Martin C.C. Los Molinos',
  CATIAAVSUCRE: 'Catia Av Sucre',
  LAYAGUARAAVPRINCIPAL: 'La Yaguara Av. Principal',
  ELPARAISO: 'El Paraíso',
  CITYMARKET: 'City Market',
  UNIVERSIDADCATOLICAANDRESBELLO: 'Universidad Catolica Andres Bello',
  QUINTACRESPO: 'Quinta Crespo',
  SAMBILPARAGUANA: 'Sambil Paraguaná',
  PUNTOFIJOAVJACINTOLARA: 'Punto Fijo Av Jacinto Lara',
  BARQUISIMETOAVVARGAS: 'Barquisimeto Av. Vargas',
  SAMBILBARQUISIMETO: 'Sambil Barquisimeto',
  BARQUISIMETOZONAINDUSTRIAL: 'Barquisimeto Zona Industrial',
  QUIBOR: 'QuÍbor',
  CARORA: 'Carora',
  MERIDAVIADUCTO: 'Mérida Viaducto',
  PASEOLASMERCEDES: 'Paseo Las Mercedes',
  CUMBRESDECURUMO: 'Cumbres De Curumo',
  'CC.LACASCADA': 'C.C. La Cascada',
  SAMBILCARACAS: 'Sambil Caracas',
  LOSCORTIJOS: 'Los Cortijos',
  'GUARENASCC.MIRANDA': 'Guarenas C.C. Miranda',
  ELMARQUES: 'El Marques',
  MACARACUAY: 'Macaracuay',
  GUATIRECCBUENAVENTURA: 'Guatire CC Buenaventura',
  CENTROCOMERCIALPARQUECOSTAAZUL: 'Centro Comercial Parque Costa Azul',
  SAMBILMARGARITA: 'Sambil Margarita',
  JUANGRIEGO: 'Juan Griego',
  GUANARE: 'Guanare',
  TUREN: 'Turen',
  CUMANA: 'Cumana',
  SAMBILSANCRISTOBAL: 'Sambil San Cristobal',
  SANCRISTOBAL7MAAVENIDA: 'San Cristobal 7ma. Avenida',
  BOCONO: 'Bocono',
  CARVAJAL: 'Carvajal',
  SABANADEMENDOZA: 'Sabana De Mendoza',
  TRUJILLO: 'Trujillo',
  VALERALAPLATA: 'Valera La Plata',
  VALERALAPUERTA: 'Valera La Puerta',
  CATIALAMAR: 'Catia La Mar',
  ELJUNQUITO: 'El Junquito',
  MENEGRANDE: 'Mene Grande',
  CABIMASAVINDEPENDENCIA: 'Cabimas Av. Independencia',
  SANTABARBARA: 'Santa Bárbara',
  LACONCEPCION: 'La Concepción',
  CASIGUA: 'Casigua',
  MACHIQUES: 'Machiques',
  CARRASQUERO: 'Carrasquero',
  MARACAIBONORTE: 'Maracaibo Norte',
  INDIOMARA: 'Indio Mara',
  'GALERIASMALL-MCBO': 'Galerías Mall - Mcbo',
  CENTROLAGOMALL: 'Centro Lago Mall',
  NAUTICO: 'Nautico',
  CURVADEMOLINA: 'Curva De Molina',
  SABANETA: 'Sabaneta',
  CALLE72: 'Calle 72',
  SANMIGUEL: 'San Miguel',
  MARACAIBOZONAINDUSTRIAL: 'Maracaibo Zona Industrial',
  LASMERCEDES: 'Las Mercedes',
  ELTRANSITO: 'El Transito',
  SAMBILMARACAIBO: 'Sambil Maracaibo',
  PUERTOSDEALTAGRACIA: 'Puertos De Altagracia',
  ELSAMAN: 'El Saman',
  MERCAMARA: 'Mercamara',
  SANTARITA: 'Santa Rita',
  CAJASECA: 'Caja Seca',
  ELMOJAN: 'El Mojan',
  AVBLANDINCHACAO: 'Av. Blandin Chacao',
  LACASTELLANA: 'La Castellana',
  ELMENITO: 'El Menito',
  PUERTODEMARACAIBO: 'Puerto De Maracaibo',
  CAMPOALEGRE: 'Campo Alegre',
  TAQUILLAALCALDIACHACAO: 'Taquilla Alcaldia Chacao',
  CAUCAGUA: 'Caucagua',
  RIOCHICO: 'Rio Chico',
  LAVELA: 'La Vela',
  SANTAISABEL: 'Santa Isabel',
  NAIGUATA: 'Naiguata'
}

const sites = [
  {
      id: "42d72c21-c2ae-43b0-bdd3-eb982f5ccc25",
      name: "(1) San Bernardino",
      address: "Av. Vollmer, Centro Empresarial Caracas, Torre Sur, P.B, Urb. San Bernardino, Municipio Libertador, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "c34c9d5c-e4a1-4eaa-9221-af20914d372d",
      name: "(10) Traki San Martín",
      address: "Av. Principal de San Martín, calle B de la Zona Industrial San Martín, P.B, Parroquia San Juan, Municipio Libertador, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "7a410260-b82b-445c-8cbe-6393860f51b9",
      name: "(11) La Candelaria Casabera",
      address: "Av. Urdaneta, Esquina Urapal, Conjunto Residencial Comercial Casabera, Locales PB01-PB02, PB., Urb. La Candelaria. Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "7d428e9a-5f9b-426a-96c4-2d782b968557",
      name: "(11) Taquilla Hosp. Ortopédico Infantil",
      address: "Av. Andrés Bello, Sector Guaicaipuro, Fundación Hospital Ortopédico Infantil, Parroquia El Recreo, Municipio Libertador, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "43f0cc5c-82c0-468d-a081-5c0f60cc9b65",
      name: "(12) La Urbina",
      address: "Calle #9, Edf. Tasti, P.B, Urbanización La Urbina, Municipio Sucre, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "acda7879-99dc-474f-a020-98fce149db91",
      name: "(13) Catia Boulevard",
      address: "Av. España, Boulevard El Atlántico, Edificio Ema, P.B., Urb. Nueva Caracas, Municipio Libertador. Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "757a1de3-2cb6-4b70-89e2-02caf6402375",
      name: "(14) Charallave",
      address: "Av. Cristóbal Rojas, Calle N° 12, C.C. Los Peñones, Locales 3-5, PB., antiguo Club Los Peñones. Charallave, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CHARAVALLE)[0].id
  },
  {
      id: "9d6a523c-62e9-449a-b7eb-6845c5e6a390",
      name: "(15) Ciudad Ojeda Centro",
      address: "Av. Bolívar Esquina Con Calle Sucre. Edificio B.O.D, Ciudad Ojeda, Estado Zulia",
      cityId: cities.filter(city => city.name === cityOnlyNames.CIUDADOJEDA)[0].id
  },
  {
      id: "a47bf4ee-bb54-46db-bc0c-a6dd0d09f3a1",
      name: "(16) Los Taques Falcón",
      address: "Edif. Sede de la Sociedad Hafran Servicios Múltiples C.A., a 500 mts del Distribuidor El Taparo. Av. Intercomunal Alí Primera, Sector Judiban Municipio Los Taques, Punto Fijo, Estado\n                  Falcón.",
      cityId: cities.filter(city => city.name === cityOnlyNames.DABAJURO)[0].id
  },
  {
      id: "0a8426ad-8853-4a7e-a87d-f6c9c46751fe",
      name: "(18) Santa Teresa del Tuy",
      address: "Av. Independencia con Calle Las Margaritas, C.C. Las Flores, PB, Urbanizacion Las Flores, Parroquia Santa Teresa Del Tuy, Municipio Independencia, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANTATERESA)[0].id
  },
  {
      id: "df2c9155-f39a-436a-9960-b33052bffb41",
      name: "(19) Guarenas",
      address: "Av. Este, Cruce con Av. Intercomunal, Parcela C-1, C.C. Copacabana, Locales 4 y 5, Urbanizacion, La Vaquera, Guarenas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.GUARENAS)[0].id
  },
  {
      id: "87910a94-6e32-422e-8301-04da34d207b2",
      name: "(20) Palo Negro Súper Líder",
      address: "Carretera Nacional Palo Negro, Vía Magdaleno, C.C. Súper Líder, Local 4, Sector Palo Negro, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PALONEGRO)[0].id
  },
  {
      id: "c616e6d9-e949-4884-aadb-b33c29eed212",
      name: "(21) Maracay C.C. Platinium",
      address: "Entre Av. Casanova Godoy y Universidad, Calle Los Caobos con Av. 108, C.C. Platinum. Maracay, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "ed5e943f-e3e4-4e4b-a71c-44c7ef505b30",
      name: "(25) San Juan de Los Morros",
      address: "Av. Fermín Toro, Edif. N° 25. Municipio Juan Germán Roscio, San Juan De Los Morros, Estado Guárico.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANJUANDELOSMORROS)[0].id
  },
  {
      id: "d4a29b79-a868-47bd-9ebf-c3409c160837",
      name: "(28) Casacoima Delta Amacuro",
      address: "Av. Bolívar con Calle Transversal I, Sector Brisas del Triunfo frente al Obelisco El Triunfo, Casacoima, Estado Delta Amacuro.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CASACOIMA)[0].id
  },
  {
      id: "6468d553-1193-414c-9a14-95bce1085467",
      name: "(29) Tucupido Guarico",
      address: "Calle Gavante con Calle Bolívar, Casa N°76, PB. Frente a la Plaza Bolívar, Municipio Ribas, Tucupido, Estado Guárico.",
      cityId: cities.filter(city => city.name === cityOnlyNames.TUCUPIDO)[0].id
  },
  {
      id: "4017ad67-118b-4984-8386-ab60dab71d29",
      name: "(30) Maracaibo Las Delicias",
      address: "Av. Las Delicias Con Calle 88, Nº 88-77, Local Nº 2, P.B., Sector Las Delicias, Municipio Maracaibo, Ciudad Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "48e6c0ac-24f5-4501-9173-76286bbcc846",
      name: "(30) Taquilla Alcaldia de Maracaibo",
      address: "Alcaldía De Maracaibo, Avenida 4 Con Calle 96, Parroquia Bolívar, Municipio Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "db9601aa-26f3-468a-b182-956534bf1666",
      name: "(31) Maracaibo II Bella Vista",
      address: "Av. 4 (Bella Vista) Entre Calles 79 Y 80, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "ca62f769-734b-4c75-b159-c50fd9fe8dff",
      name: "(32) La Limpia",
      address: "Av. La Limpia, Entre Avenidas 79-A Y 79-B, C.C. Ciudad Traki, Parroquia Raúl Leoni, Municipio Maracaibo, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "01e99f6f-d260-4ac4-8cb5-893e6ce3bd08",
      name: "(35) El Hatillo",
      address: "Calle La Paz, N° 28 Frente A La Plaza Bolívar, El Hatillo, Edo. Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "670b49a3-ca75-4053-b6ae-4f212f31c6e2",
      name: "(36) San Jorge - El Cementerio",
      address: "Av. Bogotá con Calle La Pica, C.C. Mercado San Jorge, Local J189, PB., El Cementerio. Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "7a69868e-a8dd-4eaa-8209-3808b4fefaf5",
      name: "(40) San Cristóbal",
      address: "C.C. Tamá, P.B., Local Nº 33, Urb. Los Pirineos, Municipio San Cristóbal, San Cristóbal, Estado Táchira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANCRISTOBAL)[0].id
  },
  {
      id: "a2d084f5-50e2-4d32-b592-9d7e9420c57c",
      name: "(42) Traki Valle de la Pascua",
      address: "Híper Galerías Traki Sector Jardín Planta Baja Local L-26, Av. Rómulo Gallegos Municipio Leonardo Infante, Valle De La Pascua, Estado Guárico.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALLEDELAPASCUA)[0].id
  },
  {
      id: "6108b00b-639c-4023-b26b-f8d2f9fd65e4",
      name: "(43) San Antonio de Los Altos",
      address: "Av. Paseo Los Andes, Urb. Las Minas, C.C. La Colina, Local C1-09a, Municipio Los Salías, San Antonio De Los Altos, Estado Miranda",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANANTONIODELOSALTES)[0].id
  },
  {
      id: "732f5bad-6afb-4ab3-abaf-c73f5bfd2d15",
      name: "(44) San Felix",
      address: "Calle Sucre, C.C. Mariño (Frente A La Plaza Miranda), San Felix, Estado Bolívar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANFELIZ)[0].id
  },
  {
      id: "17e54fe7-d471-45d1-ba11-6273167eac2c",
      name: "(45) unare",
      address: "Av. Paseo Caroní Con Calle Cupire, Centro Comercial Unare II, Municipio Caroní, Puerto Ordaz, Estado Bolívar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.UNARE)[0].id
  },
  {
      id: "90ff1732-1690-4d33-8cf0-6f7d6947423d",
      name: "(47) Altavista",
      address: "C.C. Traki, PB., Av. Las Américas, Sector Altavista, Puerto Ordaz, Estado Bolívar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOORDAZ)[0].id
  },
  {
      id: "9a20395d-990d-45a2-b7a6-2435bbd68eb1",
      name: "(49) Aeropuerto Caracas",
      address: "Aeropuerto de Caracas \"Oscar Machado Zuluaga\", Autopista Regional del Centro, Charallave, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CHARAVALLE)[0].id
  },
  {
      id: "ddaa8e08-fc6f-4e94-a767-afdfe7d466e5",
      name: "(50) Parque Cristal",
      address: "Avenida Francisco de Miranda, Entre 3ra. Y 4ta. Avenida de Los Palos Grandes, Edif. Parque Cristal, Nivel Comercial 1, Locales Lcc1-25, Lcc1-26, Lcc1-27, Municipio Chacao, Estado\n                  Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "7958550a-4b34-44d1-a572-6d5a0fbb7051",
      name: "(50) Taquilla Club Hebraica",
      address: "Instalación del Club Hebraica, Avenida Principal de Los Chorros, Centro Social Hebraica, Urbanización Los Chorros, Caracas, Estado miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "cf17b86c-2d77-482b-9de0-ee0e9b81f52a",
      name: "(51) Eurobuilding",
      address: "Hotel Radisson Plaza Eurobuilding, Nivel Lobby, Ala Este, Local N° 3 y 4, Urbanización Chuao, Municipio Baruta, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "5f610b87-54a0-49fd-b3f2-f58a1af040a8",
      name: "(52) Altamira",
      address: "Av. San Juan Bosco y Av. San Felipe, Edf. Centro Altamira, Locales 3-5, PB., Urbanización Altamira. Municipio Chacao, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "8566961a-3b51-4bac-8f7f-8bceb8f82fda",
      name: "(53) San Román",
      address: "Av. Panorama, C.C. El Mirador, Local 01, Sótano, Lomas del Mirador, Urbanización San Román, Municipio Baruta, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "4066b7c7-2ed6-42d4-a589-1f867ac7fd48",
      name: "(54) Centro Comercial Alto Prado",
      address: "Av. Principal de Alto Prado, C.C. Alto Prado, Locales 11 y 30, PB. y Mezzanina, Urb. Alto Prado, Municipio Baruta, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "d0b6c028-6df1-4718-88b5-ce3933fd4e7d",
      name: "(55) C.C. Ciudad Tamanaco",
      address: "Av. La Estancia, C.C.C.T., Nivel C-2, Local 53-M-02, Urb. Chuao, Municipio Chacao, Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "722ae278-8799-4d10-bbba-b96e197b3bc2",
      name: "(56) La Guaira",
      address: "Av. Soublette, Edificio Contasa, P.B., Local Nº 1, Municipio Vargas, Estado La Guaira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAGUAIRA)[0].id
  },
  {
      id: "c04a89af-8169-415a-a9fd-83656beefea5",
      name: "(57) Plaza Las Américas",
      address: "C.C. Plaza Las Américas, Segunda Etapa, Nivel Comercio 2, Locales COM2-6, Urbanizacion El Cafetal, Municipio Baruta, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "3c5e6f8f-dc1b-4bd1-ae44-8bb90b849ad4",
      name: "(59) Av. Victoria",
      address: "Av. Presidente Medina con Av. Nueva Granada, C.C. Multiplaza Victoria, Local V-4, PB., Sector El Peaje, Urb. Las Acacias. Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "ea1e48bc-cdc7-4f7e-acf3-20e4d12661fe",
      name: "(60) Capanaparo",
      address: "Av. Lara con Calle Capanaparo, C.C. Capanaparo, P.B. Local N°1, Barquisimeto, Estado Lara",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "ae191918-afda-4d45-9389-ad54a5ebf53f",
      name: "(63) Acarigua",
      address: "Av. 31 (Libertador) Esq. Con Calle 34. Acarigua - Edo. Portuguesa.",
      cityId: cities.filter(city => city.name === cityOnlyNames.ACARIGUA)[0].id
  },
  {
      id: "5fbbef50-3b4f-4573-89a7-16aa78c58844",
      name: "(66) Maracay Torre Sindoni",
      address: "Calle 1 entre Av. Bolívar y Miranda, Torre Sindoni, Local 19, PB. Municipio Girardot, Maracay, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "011369d5-ba47-40d0-800a-88b30d31a315",
      name: "(67) Cagua Súper Líder",
      address: "Carretera Nacional Cagua - La Villa, Parcela 4, Supermercado Super Líder, Sector La Becerrita. Municipio Sucre, Cagua, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CAGUA)[0].id
  },
  {
      id: "7b4a09ca-44a7-4ab2-93b5-a187711f6fb2",
      name: "(68) Súper Líder El Limón",
      address: "Av. Caracas con cruce Francisco Yépez Fernández, Supermercado Super Líder, Sector Niño Jesús, Lote N°2. Municipio Mario Briceño Iragorry, Maracay, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "a7669aa3-430e-4d36-8c53-3082b12aa933",
      name: "(69) Barquisimeto Mercabar",
      address: "Av. Carlos Giffoni, Zona Industrial Iii, Mercado Mayorista De Barquisimeto, Zona Financiera, Parroquia Juan De Villegas, Municipio Iribarren, Barquisimeto, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "606ffd38-6d67-435e-bbd6-160371a8a0d3",
      name: "(71) Puerto Cabello",
      address: "Av. Plaza, C.C. Profesional Plaza, Local 10-I, Parroquia Fraternidad, Municipio Puerto Cabello, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOCABELLO)[0].id
  },
  {
      id: "70736201-6c72-42a5-8d78-b2e25fab251b",
      name: "(73) Av. Pedro León Torres",
      address: "Av. Pedro León Torres con Calle 59, Centro Comercial Locatel Oeste, Municipio Iribarren, Barquisimeto, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "3ed5c03d-ab0d-43dd-add7-338969f28af3",
      name: "(74) Ciudad Bolívar",
      address: "C.C. Ciudad Traki, Av. Libertador con Calle Los Nisperos, Municipio Heres, Ciudad Bolivar, Estado Bolivar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CIUDADBOLIVAR)[0].id
  },
  {
      id: "9d83864c-00c3-4bec-821a-536458efd823",
      name: "(76) Valencia Sur",
      address: "Av. Industrial I, Centro Empresarial Punto Sur, Zona Industrial Sur, Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "92ece1a7-e288-4fe1-a174-c54bc2eb9886",
      name: "(79) San Sebastián de los Reyes",
      address: "Calle Bolívar frente a la Plaza los Tres Diputados, San Sebastian de los Reyes, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANSEBASTIAN)[0].id
  },
  {
      id: "30f81e69-4fc6-4cf1-a437-42cc977fdca4",
      name: "(80) Maracay Las Delicias",
      address: "Avenida Las Delicias Urbanización el Bosque, Parcela N°32, Parroquia María Madre de San José, Municipio Girardot, Maracay, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "e6f22bd2-1286-42b0-ac3a-a0a6db66d9d0",
      name: "(81) Maracay Centro",
      address: "Avenida La Estación, Entre Calles Páez, Mariño y Soublette, Centro Comercial Paseo Estación Central, Sector Centro De Maracay, Parroquia Madre María De San José, Municipio Girardot,\n                  Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "5e72117c-7201-4ecb-bc08-5f064d194755",
      name: "(82) Maracay Santos Michelena",
      address: "Av. Santos Michelena Oeste, PB Local Nro. 48-1, Maracay, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "656e6628-b0f6-44e6-95e9-85719e0359d2",
      name: "(83) Maracay Alcaldia",
      address: "Sede de la Alcaldía de Maracay (Girardot) PB. Maracay, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "8c5aa2af-d8bf-4e71-8d40-823987e52d7f",
      name: "(85) Valencia Bolívar Norte",
      address: "Av. Bolívar Norte, Sector La Alegría, Torre Principal, PB, Local N° 1, Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "c2a6b5f3-3b5f-4cd9-925b-a7e6e8fbda5e",
      name: "(88) Cagua",
      address: "Calle Sucre con Calle Cajigal, C.C. La Pirámide, Locales A-17/A-20, PB. Cagua, Municipio Sucre, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CAGUA)[0].id
  },
  {
      id: "31abdf72-e039-402a-a2b3-dff5d7ca5d85",
      name: "(89) Maracay Los Samanes",
      address: "Av. Mata Redonda, Hipermercado Súper Líder Los Samanes, Galpón 1, Municipio. Girardot, Estado Aragua",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "9c79cc25-f2ac-4b2c-92de-c66a59f1da16",
      name: "(91) Villa de Cura",
      address: "Avenida Paradisi cruce con Calle Sucre, Centro Comercial Villa Hermosa, Locales PB1 y PB2, Villa de Cura, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VILLADECURA)[0].id
  },
  {
      id: "abbe5b78-53e5-41a3-98e6-72459b3120d3",
      name: "(93) Merida Las Americas",
      address: "Av. Las Américas Edf. Corp Banca, Mérida, Estado Mérida.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MERIDA)[0].id
  },
  {
      id: "55f91cce-f060-416d-9acd-ce2db41adc2a",
      name: "(96) San Antonio del Táchira",
      address: "Calle 4, Entre Carreras 9, Sector Lagunitas, Municipio Bolívar, San Antonio Del Táchira, Estado Táchira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANANTONIO)[0].id
  },
  {
      id: "c13b5cac-13e8-4046-b836-6ac8aeb4e9a7",
      name: "(97) La Quizanda",
      address: "Prolongación Av. Michelena C.C. Atlas, Locales 8a Y 9a. Zona Industrial Norte, Valencia, Edo. Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "a28819d2-50d5-4f63-a453-65bd578ac953",
      name: "(98) El Rosal",
      address: "Avenida Francisco De Miranda, Con Avenida Los Cortijos, Urb. Campo Alegre, Parroquia Chacao, Municipio Chacao, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "07a5cd7a-ce8e-4ff0-b1ce-59a47591aabd",
      name: "(99) Calabozo",
      address: "Av. Octavio Viana, al lado del Centro Comercial Climar, locales PB, Calabozo, Edo. Guárico.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CALABOZO)[0].id
  },
  {
      id: "69d68ee2-f2fc-45a2-9e1b-b3d7caad1555",
      name: "(101) Maracaibo C.C. Gran Bazar",
      address: "Avenida Las Delicias, Cruce Con Avenida Libertador, Ciudad De Maracaibo, Parroquia Bolívar, Municipio Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "cfa640cf-721a-4cb3-8658-959dfcd6e7b2",
      name: "(102) Coro Supermercado Eurofalcon",
      address: "Avenida Independencia de la Ciudad de Coro, Parroquia Santa Ana, Municipio Miranda, Estado Falcón.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CORO)[0].id
  },
  {
      id: "f2c357aa-b951-4dfb-bc35-bc4044a66bd4",
      name: "(103) Puerto La Cruz Av.Alberto Ravell",
      address: "Avenida Alberto Ravell entre Calles Carabobo y Las Flores, Edificio Nº 39, Parroquia Puerto La Cruz, Municipio Juan Antonio Sotillo, Estado Anzoátegui.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOLACRUZ)[0].id
  },
  {
      id: "69de91bd-fcf5-41e5-8149-b927436bfbaf",
      name: "(104) Maracay Avenida Vargas",
      address: "Avenida Vargas, cruce con calle Paez, Edificio Halbi PB, Maracay, Parroquia Pedro José Ovalles, Municipio Girardot, Estado Aragua",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "ee97ef53-fa07-4dcf-91ba-d755698b6bfc",
      name: "(106) Carúpano CC Cristal",
      address: "Centro Comercial Cristal Carúpano, calle Independencia, cruce con calle Acosta y calle Carabobo, Local A-12, Parroquia Santa Catalina, Municipio Bermúdez, Carúpano, Estado Sucre.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARUPANO)[0].id
  },
  {
      id: "0893c9a4-59ea-436d-8e77-91d80cb29ae8",
      name: "(107) Valencia C.C. Concepto La Granja",
      address: "Avenida Paseo Cabriales, Urbanización La Granja, Centro Comercial Concepto La Granja. Locales LPB-02,03,04. Parroquia Naguanagua, Municipio Naguanagua, Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "7ac4866a-dd3d-4323-bdc6-c14820ac8baf",
      name: "(108) Porlamar Alcaldía Mariño",
      address: "C.C. Bella Vista, Calle San Rafael, Alcaldía Municipio Mariño, Parroquía Mariño. Municipio Mariño. Porlamar, Estado Nueva Esparta.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PORLAMAR)[0].id
  },
  {
      id: "d105e3f5-5d15-4020-91e7-112e93b5e1dc",
      name: "(109) Bejuma Avenida Los Fundadores",
      address: "Av. Los Fundadores De La Ciudad de Bejuma, Municipio Bejuma, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BEJUMA)[0].id
  },
  {
      id: "fa93d201-5441-42d8-9b8f-02956f5b79be",
      name: "(110) Puerto Ordaz Continental",
      address: "Edf. Torre Continental, PB. Locales 4 y 5, Av. Guayana con calle Cuchivero, Sector Altavista Norte, Municipio Caroní Puerto Ordaz, Estado Bolivar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOORDAZ)[0].id
  },
  {
      id: "31557e6c-ccab-41d5-b57f-d7157de64bfe",
      name: "(112) El Vigía",
      address: "Av. Bolívar, Edf. Los Alpes N° 2-28, frente al Centro Cultural Mariano Picon Salas. El Vigia, Municipio Alberto Adriani, Estado Mérida.",
      cityId: cities.filter(city => city.name === cityOnlyNames.ELVIGIA)[0].id
  },
  {
      id: "4ac7116f-2848-4f3d-940d-6ec9e102666d",
      name: "(115) Alcaldía Casanay",
      address: "Sede de la Alcaldía de Casanay, entre Calle Caracas y final de Calle Venezuela, Municipio Andrés Eloy Blanco, Casanay, Estado Sucre.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CASANAY)[0].id
  },
  {
      id: "9102457f-a925-467a-bd2f-b335cabac38a",
      name: "(117) Valera",
      address: "Edificio Ferdinando, Calles 18 Y 19 De La Av. Bolívar, Local Nº 1, P.B., Valera, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALERA)[0].id
  },
  {
      id: "c26cadca-e563-4cd1-913a-0ca1e19f77b3",
      name: "(119) Punto Fijo II",
      address: "Av. Ollarvides, Frente a la Bomba Libertad, Puerta Maraven, Municipio Carirubana, Punto Fijo, Estado Falcón.",
      cityId: cities.filter(city => city.name === cityOnlyNames.DABAJURO)[0].id
  },
  {
      id: "f2aaf3e2-17de-49bd-8151-cd2cb34da41e",
      name: "(122) Coro I - Falcón",
      address: "Av. Rómulo Gallegos, Edif. Omar, al lado del C.C. Fady, Parroquia San Antonio, Municipio Miranda, Estado falcon.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CORO)[0].id
  },
  {
      id: "94a2b9fa-232b-440b-ad7d-d4d06cce9268",
      name: "(123) Los Haticos",
      address: "Av. 17 Los Haticos, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "e16be78d-30f0-40ea-8b8f-0120f6964bb6",
      name: "(124) C.C. Planeta Sotavento Maiquetía",
      address: "Avenida La Armada, Conjunto Residencial Sotavento 2, Centro Comercial Planeta Sotavento, PB, Parroquia Maiquetia, Municipio Vargas, Estado La Guaira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CATIALAMAR)[0].id
  },
  {
      id: "bef9e18f-2284-4382-8672-c697d65a870e",
      name: "(125) Maracaibo 5 De Julio",
      address: "Edif Torre BNC, Calle 77 (5 De Julio) Esquina Av. 17 (Baralt) Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "51445e96-7f6c-4b09-bf5e-afe47cc83c8c",
      name: "(126) Villa Del Rosario",
      address: "Calle Donaldo Blanco Garcia, Entre Calles Municipal Y Concepción. Rosario De Perijá - Edo. Zulia",
      cityId: cities.filter(city => city.name === cityOnlyNames.VILLADELROSARIO)[0].id
  },
  {
      id: "3a38955a-69f5-439b-bf10-82a07cd86625",
      name: "(127) Valencia Camoruco",
      address: "Avenida Bolívar, Antigua Calle Constitución o Avenida Camoruco, Nro. 125-20, Municipio Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "f0268ec2-0ac7-4d61-a469-9336b2426dca",
      name: "(128) Valencia Centro",
      address: "Av. Montes De Oca, Con Calle Independencia Centro Empresarial Torre Araujo, Local L-9. Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "53ba94be-83f0-4e85-8b9f-156d3188038d",
      name: "(129) Ciudad Bolívar II",
      address: "Edif. Centro Financiero, Local P.B. 2, Paseo Heres cruce con Callejón Angostura, Sector Cruz Verde, Municipio Heres, Ciudad Bolivar, Estado Bolivar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CIUDADBOLIVAR)[0].id
  },
  {
      id: "54e5eb04-fcf0-4e2c-8bc6-ba212a8c7b2f",
      name: "(130) Club La Lagunita",
      address: "Instalaciones de La Lagunita Country Club, El Hatillo. Municipio El Hatillo, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "a8d303f8-6774-40be-9fdb-8cad64f63ec7",
      name: "(133) Choroní",
      address: "Carretera Choroní, Vía Puerto Colombia. Entre El Pueblo de Camping y Puerto Colombia. Municipio Girardot, Choroní, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CHORONI)[0].id
  },
  {
      id: "d859d34d-9b44-4b85-9594-500943339b15",
      name: "(135) Centro Medico Maracay",
      address: "Av. Las Delicias, Urb. El Bosque, Edif. Centro Médico Maracay, Parroquia Choroní, Municipio Girardot, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "128f90ad-56d8-4bc9-b940-57885fc6e4f2",
      name: "(137) Zona Industrialii Barquisimeto",
      address: "(*) Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Metrópolis Barquisimeto C.C. Metrópolis, Av. Francisco Jimenez Y Av. La Salle, Municipio Irribarren,\n                  Parroquia Juan De Villegas, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "5a9bf3b7-e2c5-48c9-aa78-50e01601bcb6",
      name: "(142) Los Dos Caminos",
      address: "Av. Francisco de Miranda cruce con calle Guanchez Edificio Valencia II PB, Municipio Sucre, Parroquia Leoncio Martínez, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "c3ec984e-52b8-41e6-8434-a1815a5d29d7",
      name: "(144) La Victoria C.C. Palma Center",
      address: "Centro Comercial Palma Center, Calle Andrés Bello Sur, Nro. 20, Zona Centro de la Ciudad de la Victoria. Municipio Jose Félix Ribas, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAVICTORIA)[0].id
  },
  {
      id: "11fdac9b-b825-4530-b79e-ca8fabe324a7",
      name: "(146) Porlamar - Margarita",
      address: "Av. Rómulo Betancourt, cruce con Calle Jesús Maria Patiño, Porlamar, Municipio Mariño, Porlamar, Estado Nueva Esparta.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PORLAMAR)[0].id
  },
  {
      id: "f880f40f-dbcd-4309-b1ed-ae1e2adddde1",
      name: "(148) Las Garcitas Valencia",
      address: "Parque Industrial Las Garcitas, Local Nº2, Carrtera Nacional Valencia-Caracas, Municipio Los Guayos, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LOSGUAYOS)[0].id
  },
  {
      id: "6fd76a31-1e89-4c37-b966-cbbafdd2f33e",
      name: "(151) Maturin II",
      address: "Av. Luis del Valle Garcia con calle 3, Barrio Carnevali de Maturin, Parroquia San Simón, Estado Monagas.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MATURIN)[0].id
  },
  {
      id: "98fb7c68-d260-4f3f-a6aa-b01bde6f2220",
      name: "(152) C.C. Babilón Centro Sur",
      address: "Av. Circunvalación Nº 2, C.C. Babilon Centro Sur, Nº 60.240, Sector Los Estanques, Parroquia Luis Hurtado Higuera, Municipio Autónomo Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "26d9ce41-4723-425a-84a6-90230c5d63fe",
      name: "(153) La Trinidad Zona Industrial",
      address: "Av. Gonzalez Rincones, Edf. Centro-Ven, Locales 8 Y 9, P.B, Zona Industrial La Trinidad, Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "411b6a1a-0184-439f-8906-6ab28e8f5828",
      name: "(153) Taquilla Centro Italo Venezolano",
      address: "Avenida Rio Paragua, Autopista Prados Del Este, Barrio Santa Cruz Del Este, Centro Italiano Venezolano, Parroquia Baruta, Municipio Baruta, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "0b2d7618-77a4-400b-9782-35b2ed995f1e",
      name: "(155) Eurobuilding Puerto Ordaz",
      address: "Hotel Eurobuilding, Nivel Lobby, Locales 4 y 5, Plaza Guayana, Urbanizacion Altavista Norte, Municipio Caroní, Puerto Ordaz, Estado Bolivar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOORDAZ)[0].id
  },
  {
      id: "dcaacd36-4bc2-4070-86b5-4e763e81c5d4",
      name: "(156) Eurobuilding Barinas",
      address: "Av. Suiza Con Calle Pie de Monte, Urbanización Alto Barinas, Hotel Eurobuilding Express Barinas, Municipio Barinas, Estado Barinas.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARINAS)[0].id
  },
  {
      id: "fee0b3b3-b699-440e-91d7-3096dd92df57",
      name: "(159) Club Puerto Azul",
      address: "Carretera Naiguatá, Frente A La Urb. Longa España, Club Puerto Azul, Naiguatá, Estado La Guaira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAGUAIRA)[0].id
  },
  {
      id: "907f1ce8-f759-4bf2-aa15-1cabf37720d7",
      name: "(161) Porlamar Centro",
      address: "Calle Velasquez C/C Calle Fraternidad Porlamar. Edo. Nueva Esparta.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PORLAMAR)[0].id
  },
  {
      id: "9e56d085-b15b-4657-b3e5-86560fd7ae5d",
      name: "(162) Ciudad Ojeda",
      address: "Av. Intercomunal Cabimas - Lagunillas, Edificio Zulia, Locales PB-1, PB-2, PB-3 Y PB-4, Jurisdicción Del Municipio Autónomo Lagunillas Del Estado Zulia, Parroquia De Ciudad Ojeda,\n                  Municipio Lagunillas, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CIUDADOJEDA)[0].id
  },
  {
      id: "f2189c6d-a406-4e4f-bd7c-62f29fde72e0",
      name: "(163) Centro Comercial Los Teques",
      address: "Centro Comercial Los Teques, Av. Pedro Russo Ferrer, Sector El Tambor, PB-A1, Los Teques, Municipio Guaicaipuro, Parroquia Los Teques, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LOSTEQUES)[0].id
  },
  {
      id: "37a45692-ff33-410a-9f9f-faac57e1f158",
      name: "(164) El Sombrero",
      address: "Residencias Virgen del Carmen, Calle Federación, Cruce con Calle El Descanso, Local 1, El Sombrero, Municipio Julián Mellado, Estado Guárico.",
      cityId: cities.filter(city => city.name === cityOnlyNames.ELSOMBRERO)[0].id
  },
  {
      id: "ed3db184-0691-49ed-b62d-932daa08eeb0",
      name: "(165) Centro Comercial Metrópolis",
      address: "C.C. Metropolis, Nivel El Sol, Locales N° 243 y 243 A, Av. Florencio Jimenez y Av. La Salle, Jurisdicción del Municipio Irribarren, Parroquia Juan de Villegas, Barquisimeto Estado\n                  Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "ec6e6ccd-698e-49a9-9dbf-33b3dd29376c",
      name: "(166) Santa Mónica",
      address: "Avenida Arturo Michelena, Cruce con Calle Codazzi, Urbanización Santa Mónica, Parroquia San Pedro, Municipio Libertador, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "da2ad2f2-fe2a-4682-8e7e-a6a726397782",
      name: "(168) C.C. Metrópolis Valencia",
      address: "Centro Comercial Metrópolis, Nivel Agua Ancla 2, Local 1 A2-108, Autopista Regional del Centro, Municipio San Diego, Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANDIEGO)[0].id
  },
  {
      id: "0979e30a-668a-4f4f-9bf8-a56588a75308",
      name: "(169) Traki Cabimas",
      address: "Local LF-1 Piso 1, Av. Intercomunal, Sector la INOS al lado de Makro, Parroquia Jorge Hernández, Municipio Cabimas, Estado Zulia",
      cityId: cities.filter(city => city.name === cityOnlyNames.CABIMAS)[0].id
  },
  {
      id: "966f96b2-e3ff-425d-8dc3-97fc37ddfdea",
      name: "(171) Guatire Av. Intercomunal",
      address: "Avenida Intercomunal Guarenas-Guatire, Con Calle Los Bucares, Hipermercado Central Madeirense, Local Nº 10, Guatire, Municipio Zamora, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.GUATIRE)[0].id
  },
  {
      id: "d37a3466-2e44-4c10-9f07-3b43a9587395",
      name: "(172) El Tigrito",
      address: "Avenida Principal de San José de Guanipa, antes Quinta Avenida y hoy denominada Fernández Padilla, cruce con Calle Urdaneta, Municipio Guanipa, Parroquia Guanipa, Sector La Paz, ubicado en San José de Guanipa, Estado Anzoátegui.",
      cityId: cities.filter(city => city.name === cityOnlyNames.ELTIGRITO)[0].id
  },
  {
      id: "a8866282-718a-48f0-a507-f9ea6d104693",
      name: "(175) La Morita",
      address: "Centro Comercial Híper Líder La Morita, En La Prolongación De La Avenida Aragua, Sector La Morita, Ciudad de Maracay, Municipio Santiago Mariño, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "1bf7e437-4fda-4fb1-a96d-278d0e4055c9",
      name: "(176) Lecheria",
      address: "Centro Empresarial Bahía Lido, Planta Baja, Avenida Principal de Lechería, cruce con Carrera 5, Municipio Diego Bautista Urbaneja, Barcelona, Estado Anzoátegui.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LECHERIAS)[0].id
  },
  {
      id: "00aead93-10f8-4cc5-a7ba-67ad45b3b6a2",
      name: "(178) Traki Cumaná",
      address: "Av. Humboldt con Av. Las Palomas, Centro Comercial Híper Galerías Cumaná, Planta Nivel Ayacucho, Local L-81, Parroquia Santa Inés de Cumaná, Municipio Sucre, Estado Sucre.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CUMANA)[0].id
  },
  {
      id: "c3fbd83e-dc33-4478-843c-7ed7c5451996",
      name: "(181) San Ignacio",
      address: "Av. Blandín con Calle Teresa de Jesús, Centro San Ignacio, Nivel Chaguaramos. Urbanizacion La Castellana, Municipio Chacao, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "3edf91d9-fe9f-4e08-ac7e-a63a955e5446",
      name: "(184) La Candelaria Casa Italia",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia La Candelaria Casabera Av. Urdaneta, Esquina Urapal, Conjunto Resid. Comercial Casabera, P.B., Locales Nº\n                  Pb1 Y Pb2, Municipio Libertador, Caracas, Distrito Capital",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "f0dde701-9934-4e85-af3f-be9df5303985",
      name: "(185) El Viñedo",
      address: "Av. Bolívar Norte, Centro Comercial Multicentro Local B-96 Y B-97, El Viñedo, Municipio Valencia, Estado Carabobo",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "830959e2-84de-492f-a16e-20e745ab432c",
      name: "(192) Maracaibo III",
      address: "Calle 74 (Antes Dr. Arévalo González), Entre Avenidas 3h Y 3y, Edificio 2000, Municipio Coquivacoa, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "34d5abbd-ad29-4310-9280-76f8db6a30fc",
      name: "(194) San Felipe",
      address: "Av. Intercomunal San Felipe El Fuerte, Av. 4 entre Calles 2 y 3, sector complejo Industrial Agustin Rivero, Independencia, Estado Yaracuy.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANFELIPE)[0].id
  },
  {
      id: "fe3cf689-0692-4af3-86bf-c41ac3d50b22",
      name: "(196) Barinas",
      address: "Centro Comercial Los Mangos, Avenida Cruz Paredes de la Ciudad de Barinas, Municipio Barina, Estado Barinas.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARINAS)[0].id
  },
  {
      id: "b8cbe77d-3718-406b-89bc-5f1ce3992d4e",
      name: "(197) Charallave C.C. Súper Líder",
      address: "Centro Comercial Súper Líder, Avenida Tricentenaria, Urb. Industrial Albarenga, Sector Madosa, Parroquia Charallave, Municipio Cristóbal Rojas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CHARAVALLE)[0].id
  },
  {
      id: "b61e21b7-f9de-4039-8477-943aa1fdde4a",
      name: "(199) Turmero C. C. Mariño Plaza",
      address: "Centro Comercial Mariño Plaza, Calle Mariño con Calle Peñalver, Parroquia Turmero, Municipio Santiago Mariño, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.TURMERO)[0].id
  },
  {
      id: "cce92867-e8f6-49e9-9b37-d1b2dc9c643d",
      name: "(202) Yaritagua Hyper Líder",
      address: "Autopista Centro Occidental Cimarrón Andresote, Sector La Piedra, Local S/N, Supermercado Hyper Líder, Parroquia Yaritagua, Municipio Peña, Estado Yaracuy.",
      cityId: cities.filter(city => city.name === cityOnlyNames.YARITAGUA)[0].id
  },
  {
      id: "eb9b35fd-18ff-4895-b7c9-03ccc4c2b754",
      name: "(203) San Diego Supermercado Híper Líder",
      address: "Instalaciones del Supermercado Híper Líder, Avenida Intercomunal Don Julio Centeno, Parroquia San Diego, Municipio San Diego, Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANDIEGO)[0].id
  },
  {
      id: "d0c7cfd0-bcc8-443e-9924-01fe6aea41ec",
      name: "(206) San Fernando de Apure",
      address: "Avenida Caracas con Avenida Girardot, Centro Comercial Villacenter, Nivel PB. Parroquia San Fernando de Apure, Estado Apure.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANFERNANDODEAPURE)[0].id
  },
  {
      id: "42a15fe3-ce7f-46f6-8070-2ed9232d62a6",
      name: "(207) Hiperlider Cabudare",
      address: "Hiperlider Cabudare, Av. Intercomunal Barquisimeto-Acarigua, Sector La Mora. Cabudare, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CABUDARE)[0].id
  },
  {
      id: "c10ecf1c-6a4d-4d67-b16d-c6119abab3d5",
      name: "(208) San Carlos",
      address: "Avenida Independencia Cruce con Calle Federación, San Carlos, Estado Cojedes.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANCARLOS)[0].id
  },
  {
      id: "cff0093f-a2d5-43ed-aba5-9170d2a0cac2",
      name: "(209) Tucupita Traki",
      address: "Avenida Orinoco con Avenida 1, Urbanización Rómulo Gallegos, Centro Comercial Traki, Parroquia José Vidal Marcano, Municipio Tucupita, Estado Delta Amacuro.",
      cityId: cities.filter(city => city.name === cityOnlyNames.TUCUPITA)[0].id
  },
  {
      id: "7d7be8bb-34e8-4d4e-8faa-a2944ee6c8f9",
      name: "(210) Dabajuro II",
      address: "Edificio Salah, Calle los Andes, Municipio Dabajuro, Estado Falcón.",
      cityId: cities.filter(city => city.name === cityOnlyNames.DABAJURO)[0].id
  },
  {
      id: "41183b3a-dad1-4c5e-89b3-9aa95b0edced",
      name: "(213) TRAKI San Fernando de Apure",
      address: "Avenida Intercomunal Los Centauros C.C. Hipergalerías San Fernando De Apure, Local I-19, Nivel PB, Parroquia Urbana San Fernando de Apure, Municipio San Fernando, Estado Apure.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANFERNANDODEAPURE)[0].id
  },
  {
      id: "9a63ff4d-3146-464a-9ee5-ba355d255c25",
      name: "(214) Centro Residencial Solano",
      address: "Av. Francisco Solano López y Calle Negrín, Centro Residencial Solano, Primera Etapa, Urbanización Sabana Grande, Parroquia El Recreo, Municipio Libertador, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "999e3071-7e60-494b-87e1-9f8319be40cd",
      name: "(215) Sambil Valencia",
      address: "Centro Comercial El Sambil Valencia, Nivel Mañongo, Local MA-6, Av. 4, Urbanización Cuidad Jardín Mañongo ,Municipio Naguanagua ,Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "151e0a4d-f651-40c5-8d9e-9ddbcad77ced",
      name: "(216) Excelsior Gama Santa Fe",
      address: "Av. Jose Maria Vargas Urbanización Santa Fe Norte Centro Comercial Santa Fe Sotano 2, Municipio Baruta, Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "68750212-edb2-4ed0-b3d2-92bde06d8ad9",
      name: "(217) Excelsior Gama Santa Eduvigis",
      address: "Supermercado Excelsior Gama Plus, Av Romulo Gallegos Entre 1era y 2da Avenida, Urbanizacion Sta Eduvigis, Municipio Sucre, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "160297f8-d642-4619-bc9f-f38ebb3c27e1",
      name: "(218) C.C La Viña Valencia",
      address: "Av. Carabobo Con Calle Juan Uslar, Centro Corporativo La Viña Plaza Local N°11, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "816bdc29-ee4f-4fd3-9db0-9eb72e69d836",
      name: "(219) Hiper Lider Araure",
      address: "Calle 5 de la Municipalidad entre Avenida Eduardo Chollet y Trino Melean, intalaciones del Centro Comercial Hiper Lider Araure, Parroquia Capital Araure, Municipio Araure, Estado\n                  Portuguesa.",
      cityId: cities.filter(city => city.name === cityOnlyNames["ACARIGUA-ANAURE"])[0].id
  },
  {
      id: "af6153d6-c6db-40a7-9bde-6f66295803a7",
      name: "(220) Boleita",
      address: "4ta. Transversal De Monte Cristo, Los Dos Caminos Centro Empresarial Boleita, Municipio Sucre, Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "b2a62430-d447-4aaa-bbb5-982cd744dc15",
      name: "(221) Unicentro Maracay",
      address: "Av. Casanova Godoy C.C. Unicentro, Local Pb. Local 7,Parroquia Madre Maria de José Maracay Estado Aragua",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "7f0c9d4d-88f5-4885-a060-fd1ffd599fc0",
      name: "(230) Anaco Av. Mérida",
      address: "Av. Zulia C/C Av. Mérida, Edf. Banco Del Orinoco, P.B. (Frente A La Alcaldía). Municipio Anaco, Anaco, Estado. Anzoátegui.",
      cityId: cities.filter(city => city.name === cityOnlyNames.ANACO)[0].id
  },
  {
      id: "ad1c07f3-2d21-4bd4-8776-5fc098857cc8",
      name: "(231) Puerto PÍritu",
      address: "Calle Bolívar N° 32, Puerto Píritu, Municipio Píritu, Estado Anzoátegui.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PIRITU)[0].id
  },
  {
      id: "7cf795fe-f984-43b3-8659-680fdb2707df",
      name: "(233) Barcelona Centro",
      address: "Calle Eulalia Buroz (Frente A La Plaza Bolívar, Al Lado De Hidrócentro), Barcelona. Estado Anzoátegui.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARCELONA)[0].id
  },
  {
      id: "a56d0119-fe6b-4ff7-b069-9b701e5e7e95",
      name: "(234) El Tigre",
      address: "Av. Francisco De Miranda Sur E/C 11 Y 12, Edificio B.O.D. Municipio Simón Rodriguez, El Tigre - Estado. Anzoátegui",
      cityId: cities.filter(city => city.name === cityOnlyNames.ELTIGRE)[0].id
  },
  {
      id: "f9a2c387-3d00-469d-9d54-1e4a364f7ce7",
      name: "(235) Lechería Centro Empresarial",
      address: "Centro Empresarial Lechería, Local PB 01. Municipio Diego Bautista Urbaneja, Lechería Estado Anzoátegui.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LECHERIAS)[0].id
  },
  {
      id: "facaa3ce-2e01-44f2-89e6-77b209de02ea",
      name: "(236) San Fernando De Apure Intercomunal",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia San Fernando De Apure Avenida Caracas Con Avenida Girardot, Centro Comercial Villacenter, San Fernando De\n                  Apure, Municipio San Fernando, Parroquia San Fernando, Estado Apure.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "58841b15-1cb5-4797-8d97-cac0a04c3f11",
      name: "(237) Maracay Av. Aragua",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Maracay Los Samanes: Final Av. Bermúdez, Hipermercado Súper líder los Samanes, galpón nº 1, zona\n                  industrial los samanes, Municipio Girardot, Maracay, Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "4ec510c5-d8a2-489a-8350-2879936dc0be",
      name: "(238) Palo Negro Plaza Bolívar",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Palo Negro Súper Líder Carretera Nacional Palo Negro, Sector Palo Negro, Vía Magdaleno, C.C. Súper Líder,\n                  Local Nº 4, Palo Negro, Mun. Libertador, Edo Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "b9c3c327-3250-42ef-9c8f-da3f597225ec",
      name: "(239) C.C. La Victoria",
      address: "Entre Calles Francisco Loreto y Rivas Dávila. Centro Comercial Victoria, Locales A1 Y A2, La Victoria Estado Aragua.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAVICTORIA)[0].id
  },
  {
      id: "7b19de9c-730f-4200-a106-b4fde87b4923",
      name: "(240) La Morita Intercomunal",
      address: "Av. Intercomunal De Turmero. Centro Comercial Coche Aragua, Local 5 Pb. Maracay - Estado. Aragua",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAY)[0].id
  },
  {
      id: "d6064e1b-a273-4b53-9bde-226ec44e95d4",
      name: "(241) Alto Barinas",
      address: "C.C. Cima, Av. Los Andes Con Av. Andres Bello, Alto Barinas, Estado Barinas.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARINAS)[0].id
  },
  {
      id: "3da12550-5e66-4848-a56d-6a5a8a2c5c9d",
      name: "(242) Puerto Ordaz Castillito",
      address: "Avenida Principal De Castillitos Vía Caracas Cruce Con Calle Topossi Edif. Banco Unión, Sector Castillitos, Puerto Ordaz, Estado Bolivar.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOORDAZ)[0].id
  },
  {
      id: "fe9f1815-eed3-4260-b536-39c1446166a0",
      name: "(243) Guacara",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Las Garcitas Valencia: Parque Industrial Las Garcitas, Local Nº2, Carretera Nacional\n                  Valencia-Caracas,Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "797548b5-a308-4faa-bb86-e9de802118ad",
      name: "(244) Tocuyito",
      address: "Calle Sucre Nro. 23 Tocuyito, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.TOCUYITO)[0].id
  },
  {
      id: "3cd86847-58be-486b-957d-589229432b9c",
      name: "(245) Naguanagua Av. Universidad",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Valencia CC Concepto La Granja Avenida Paseo Cabriales, Urb. La Granja, C. C. Concepto La Granja, Ciudad\n                  De Valencia, Municipio Naguanagua, Edo Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.NAGUANAGUA)[0].id
  },
  {
      id: "9de0926c-d775-4150-b190-42926e97e73a",
      name: "(246) Montalbán",
      address: "Calle Bolívar C/C Carabobo Edif. Centro Frente A Plaza Bolívar, Montalbán, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MONTALBAN)[0].id
  },
  {
      id: "2434c7f4-6622-41ab-836e-e1766d5e94ff",
      name: "(247) Metroplaza",
      address: "Carretera Vía San Diego, Urbanizacion, Los Arales, C.C. Metro plaza, Locales Pb-02 Y Pm-02. Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "d0d26d81-1d5f-493e-931e-aee7fb4b7d12",
      name: "(248) Santa Rosa",
      address: "Av. Las Ferias Edf. Polo Sur, Locales 1,2 Y 3. Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "543a621b-366e-426c-88a7-6afa87492ae2",
      name: "(249) San Jose De Tarbes",
      address: "Urbanizacion San José De Tarbes, Av. 138 A Entre Calles 96 Y 97, Nº 138-41. Edificio Torre B.O.D. Planta Baja, Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "9caf2634-d67a-4849-a690-764cc9b05ac2",
      name: "(251) Candelaria Valencia",
      address: "Av. Lisandro Alvarado Cruce Con Calle Benedetti, C.C. Torinoco, Locales N° 08-09-10. Valencia, Estado Carabobo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALENCIA)[0].id
  },
  {
      id: "234860bf-68ed-41f7-9d17-a7b29952c6b7",
      name: "(252) Instituto Autonomo El Puerto",
      address: "(*) Agencia cerrada temporalmente, sus clientes serán atendidos en la Agencia Puerto Cabello: Avenida Plaza, C.C. Profesional Plaza, Local N° 10-I, Parroquia Urbana Fraternidad. Edo.\n                  Carabobo",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOCABELLO)[0].id
  },
  {
      id: "71106c11-def6-4419-9783-c85e877b037c",
      name: "(253) Tinaquillo",
      address: "Av. Miranda, Edf. Fátima, P.B. Local 2 N°6-14, Tinaquillo, Estado Cojedes.",
      cityId: cities.filter(city => city.name === cityOnlyNames.TINAQUILLO)[0].id
  },
  {
      id: "7d8a309d-07f6-4d26-a690-1e9fb6e056b4",
      name: "(254) Av.Universidad",
      address: "Av. Universidad, Esq. Sociedad A Traposo, Edf. Santana, P.B. Caracas, Estado Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "9f7eb6bc-e564-4574-9f84-41527c7cd602",
      name: "(255) San Martin C.C. Los Molinos",
      address: "Av. San Martín, Centro Comercial Los Molinos, Locales 25 Al 28 Nivel Mezzanina, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "1f85b8ee-dcf7-413f-b104-1162282b56dd",
      name: "(256) Catia Av Sucre",
      address: "Av. Sucre Edf. La Industria Frente A La Estación Del Metro Agua Salud. Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "03579c3d-5bc7-4906-855d-be655b0c6793",
      name: "(257) La Yaguara Av. Principal",
      address: "Av. Ppal De La Yaguara Con Calle Seis. Centro Empresarial Melo, P.B.Frente Al Vivex. La Yaguara, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "86f27ff5-4591-45a5-918f-0f8f7a2c8e05",
      name: "(258) El Paraíso",
      address: "Av. José A. Paez, Entre Av. H Y D, Edf. El Triángulo, P.B., Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "c1083143-9a88-4ac7-91a5-73bfcd1f56dd",
      name: "(259) City Market",
      address: "Av. Abraham Lincoln, Calle unión y Calle Villa flor C.C. City Market, Nivel Feria Locales 303 al 308. Boulevard De Sabana Grande, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "e9105878-c452-4831-8b3c-10d56562bbda",
      name: "(260) Universidad Catolica Andres Bello",
      address: "Av. Teherán Sede UCAB Planta Baja Montalbán, Municipio Libertador, Parroquia La Vega, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "f6c684ca-5333-4aac-bb61-311a002d8665",
      name: "(261) Quinta Crespo",
      address: "Av. Baralt, Frente Al Mercado De Quinta Crespo,Torre Gavi, Local 2 Planta Baja y Mezzanina, Caracas, Distrito Capital.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "83878811-a822-4898-93b9-f791c28e973f",
      name: "(262) Sambil Paraguaná",
      address: "Avenida Intercomunal Ali Primera, Sector Hato Nuevo Centro Comercial Sambil Paraguaná, Locales L-30 al L-32, Estado Falcón.",
      cityId: cities.filter(city => city.name === cityOnlyNames.DABAJURO)[0].id
  },
  {
      id: "69f06f8d-58a9-4494-bdbd-0b9cb2437fc4",
      name: "(263) Punto Fijo Av Jacinto Lara",
      address: "Av. Jacinto Lara Entre Calles C Y D, Esquina Av. Pumarrosa, Punto Fijo, Estado Falcón.",
      cityId: cities.filter(city => city.name === cityOnlyNames.DABAJURO)[0].id
  },
  {
      id: "e4d19de7-22c3-4895-8324-345bd4c46d30",
      name: "(264) Barquisimeto Av. Vargas",
      address: "Av. 20 Con Av. Vargas Torre Corp Banca, Planta Baja. Barquisimeto, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "be1a32e6-14f6-4658-b864-53260b2f0387",
      name: "(265) Sambil Barquisimeto",
      address: "Av. Venezuela con Argimiro Bracamonte. Centro Comercial Sambil, Locales L- 02. Barquisimeto, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "16b4d06f-ec9d-4a3f-82c6-1a824f18412c",
      name: "(266) Barquisimeto Zona Industrial",
      address: "Av. Las Industrias Vía Mercabar Zona Industrial II Barquisimeto, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BARQUISIMETO)[0].id
  },
  {
      id: "78f45a10-3e99-48f1-99f6-7d2f6936f3bf",
      name: "(267) QuÍbor",
      address: "Calle 9 Entre Av. 6 Y 7 Quíbor, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.QUIBOR)[0].id
  },
  {
      id: "742a3faa-6075-4ab3-9bba-ee50a1b2a688",
      name: "(268) Carora",
      address: "Av. Francisco De Miranda con Av. La Feria, Edif. Sorgo, Carora, Estado Lara.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARORA)[0].id
  },
  {
      id: "d7f21c03-5d8b-49cd-83ca-23ed403e8998",
      name: "(269) Mérida Viaducto",
      address: "Av. Cardenal Quintero Entre Principal Viaducto Campo Elias Y Av. Los Próceres. C.C. Viaducto. Mérida, Estado Mérida",
      cityId: cities.filter(city => city.name === cityOnlyNames.MERIDA)[0].id
  },
  {
      id: "8974dae5-0516-439a-865d-a46777785587",
      name: "(270) Paseo Las Mercedes",
      address: "C.C. Paseo Las Mercedes, Nivel Mezzanina Local N1-B2. Las Mercedes, Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "4cc9c471-d016-4b60-b12d-38a582f0779a",
      name: "(271) Cumbres De Curumo",
      address: "Av. Principal De Cumbres De Curumo, C.C. Cumbres De Curumo, Local C, P.B., Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "92108b77-9cf0-437e-9b99-192109a9fafa",
      name: "(272) C.C. La Cascada",
      address: "Carretera Panamericana Km 21, Centro Comercial La Cascada N° 17 Piso. 1 Local N-17, Carrizal, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARRIZALES)[0].id
  },
  {
      id: "1e37dc9c-0a4b-4ea0-a74d-516741910914",
      name: "(273) Sambil Caracas",
      address: "Centro Comercial Sambil, Plaza El Arte, Nivel Autopista, Local Ac-48, Municipio Chacao.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "4b314099-24ae-47ae-bc35-a186471d5948",
      name: "(274) Los Cortijos",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Los Dos Camino Av. Francisco De Miranda Cruce Con Calle Guánchez Edificio Valencia II PB, Municipio\n                  Sucre, Parroquia Leoncio Martínez, Edo Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "61ea94b6-1317-4861-b850-f4de55e023ce",
      name: "(275) Guarenas C.C. Miranda",
      address: "Urbanización Doña Menca De Leoni, Av. Martin Vera Guerra, C.C. Miranda Local 1, Guarenas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.GUARENAS)[0].id
  },
  {
      id: "a020e77d-3460-45f4-af16-9b22ca501620",
      name: "(276) El Marques",
      address: "Av. Francisco De Miranda, Unicentro El Marques Nivel 1, P.B. Local 104 Y 107 El Marques, Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "6b6b64c4-b815-4f58-8e53-5f864bbb665e",
      name: "(277) Macaracuay",
      address: "Centro Comercial Macaracuay Plaza, Nivel C1, Local 3, Caracas, Municipio Sucre, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "2e247218-1cea-496f-8a48-0106fbb24879",
      name: "(279) Guatire CC Buenaventura",
      address: "Av. Intercomunal Guarenas - Guatire, Centro Comercial Buenaventura, Local C-35, Guatire, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.GUATIRE)[0].id
  },
  {
      id: "4c48912f-8367-4a6f-b9c7-d9c36426e4b6",
      name: "(280) Centro Comercial Parque Costa Azul",
      address: "Av. La Auyama, Urbanización Costa Azul, C.C. Parque Costa Azul local La1-03, Municipio Maneiro, Pampatar Nueva Esparta.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PAMPATAR)[0].id
  },
  {
      id: "c8cf9594-e829-4c47-a4b8-7db719c1b0bf",
      name: "(281) Sambil Margarita",
      address: "Av. Luisa Cáceres De Arismendi. Centro Comercial Sambil, Local Rs-21. Pampatar Isla De Margarita, Edo. Nueva Esparta",
      cityId: cities.filter(city => city.name === cityOnlyNames.PAMPATAR)[0].id
  },
  {
      id: "27cc94eb-146f-4d7e-b208-7d6783629966",
      name: "(282) Juan Griego",
      address: "Calle La Marina Entre Calles Bolívar Y Aurora, Edf. Banco Del Orinoco Juan Griego, Estado Nueva Esparta.",
      cityId: cities.filter(city => city.name === cityOnlyNames.JUANGRIEGO)[0].id
  },
  {
      id: "5a034792-33b9-4f18-a47b-fa2ae64fffb0",
      name: "(283) Guanare",
      address: "Av. Unda Esquina Carrera 8, Al Lado C.C. Cada, Guanare, Estado Portuguesa.",
      cityId: cities.filter(city => city.name === cityOnlyNames.GUANARE)[0].id
  },
  {
      id: "1bd1efc9-b871-4911-8e84-7fc514bc4614",
      name: "(284) Turen",
      address: "Av. Ricardo Perez Zambrano Edif. Corp Banca, Turen, Estado Portuguesa.",
      cityId: cities.filter(city => city.name === cityOnlyNames.TUREN)[0].id
  },
  {
      id: "e3d63904-fa04-477d-9a8f-d2d8cb80b903",
      name: "(285) Cumana",
      address: "Av. Bermúdez Con Av. Perimetral Edf. Don Jesus Nro. 21 (Frente Al Cada), Cumana. Estado Sucre.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CUMANA)[0].id
  },
  {
      id: "86989845-1305-4f2a-b5a9-20759cc48fe4",
      name: "(286) Sambil San Cristobal",
      address: "Av. Libertador, Sector Sabana Larga, Centro Comercial Sambil, Nivel Autopista, Local T-17, San Cristóbal, Estado Táchira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANCRISTOBAL)[0].id
  },
  {
      id: "194eabf9-5fac-4371-90a1-d212aa313efc",
      name: "(287) San Cristobal 7ma. Avenida",
      address: "Entre Av. 7 Isaías Medina Angarita Y Carrera 8 Edif. B.O.D. San Cristóbal, Estado Táchira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANCRISTOBAL)[0].id
  },
  {
      id: "242de7bc-301a-4fac-9496-c3dc5ad6dbe6",
      name: "(288) Bocono",
      address: "Calle Miranda, E/Calles Paez Y Vargas, Boconò, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.BOCONO)[0].id
  },
  {
      id: "84488b2b-5310-482f-84b7-50c9e832c361",
      name: "(289) Carvajal",
      address: "Av. Principal De Carvajal, Callejon No. 1 C.C, Vista Park, Locales Pb-05 Y Pb-06, Municipio San Rafael De Carvajal, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANRAFAELDECARVAJAL)[0].id
  },
  {
      id: "635e91ce-b2e8-4767-9d8b-6e62ef36611d",
      name: "(290) Sabana De Mendoza",
      address: "Av. Las Flores Con Calle De La Estación, Edificio Don Camilo, Sabana De Mendoza, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SABANADEMENDOZA)[0].id
  },
  {
      id: "d323b2d7-c66b-4f60-a7b6-bd0b80e747b2",
      name: "(291) Trujillo",
      address: "Calle Comercio Con Calle Cruz Verde. Trujillo, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.TRUJILLO)[0].id
  },
  {
      id: "0b7c277c-decf-4fc6-9840-99e44f763552",
      name: "(292) Valera La Plata",
      address: "Av. Bolívar C/C Calle 5 Sector La Plata, Edif. Corp Banca, Valera, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.VALERA)[0].id
  },
  {
      id: "d46a7824-510f-4520-8d2e-ca76b41abdd3",
      name: "(293) Valera La Puerta",
      address: "Centro Comercial Valle Verde Local 7, La Puerta, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAPUERTA)[0].id
  },
  {
      id: "914893d0-dc4b-454a-bf71-1765044cda3a",
      name: "(294) Catia La Mar",
      address: "Calle 10 esquina Calle 5, No. 233, Urbanización Balneario, Catia La Mar, Estado La Guaira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CATIALAMAR)[0].id
  },
  {
      id: "979eeccb-0394-4dc6-a6dd-101181e6e3d4",
      name: "(295) El Junquito",
      address: "Carretera El Junquito, Km 23 Calle Real, Lado Oeste De La Plaza Bolivar, El Junquito, Estado La Guaira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAGUAIRA)[0].id
  },
  {
      id: "8a7df78b-5189-402e-894a-06df99598b19",
      name: "(296) Mene Grande",
      address: "Av. Independencia, Diagonal A La Guardia Nacional, Centro Comercial Petrolero Mene Grande, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MENEGRANDE)[0].id
  },
  {
      id: "3464018a-af67-4275-86c6-3d59552b64e8",
      name: "(297) Cabimas Av. Independencia",
      address: "Av. Principal No. 3 Edif. B.O.D. Cabimas, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CABIMAS)[0].id
  },
  {
      id: "c09ab640-fb98-40e6-8323-b3b81a31bd84",
      name: "(298) Santa Bárbara",
      address: "Av. Bolívar Santa Bárbara, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANTABARBARADELZULIA)[0].id
  },
  {
      id: "ef316625-a3da-4c60-8266-8252a42404d1",
      name: "(299) La Concepción",
      address: "Av. Principal La Concepción, Sector Los Cocos, La Concepción, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LACONCEPCION)[0].id
  },
  {
      id: "b06501ee-ab94-416c-9b9c-a3698f06ce13",
      name: "(300) Casigua",
      address: "Calle Venezuela (Frente Al Comando De La Guardia Nacional) Casigua, Estado Zulia",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "b01667ba-d7c6-409c-ba20-2f060a53ba84",
      name: "(301) Machiques",
      address: "Calle Santa Teresa, Esquina Av. Bermúdez Machiques, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MACHIQUES)[0].id
  },
  {
      id: "942341a0-c13e-45d4-bdc4-9db42bfd28dc",
      name: "(302) Carrasquero",
      address: "Calle Principal Carrasquero Esq. Av. Bolívar, Frente A La Plaza Bolívar, Al Lado De La Jefatura Civil, Carrasquero, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARRASQUERO)[0].id
  },
  {
      id: "d6133f76-31b0-44b2-bed5-86ba3f644aaf",
      name: "(303) Maracaibo Norte",
      address: "Av. 15 Prolongación Delicias Norte, Edif. Corp Banca Frente Al C.C. Paseo Las Delicias, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "8c69473a-64fd-468d-ad4f-45a496feb236",
      name: "(304) Indio Mara",
      address: "C.C. Indio Mara Av. 22 Con Calle 70, Locales 3 Al 9, Sector Indio Mara, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "76b828a6-e6a5-4d54-9bd2-fbb70a96c276",
      name: "(305) Galerías Mall - Mcbo",
      address: "Centro Comercial Galerias Mall, Nivel Pb, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "171e8689-c25b-46a2-88fb-225e74996c5d",
      name: "(306) Centro Lago Mall",
      address: "Av. 2 El Milagro. Centro Comercial Lago Mall. Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "0ec55716-b1e0-4d9f-a862-0524104c265d",
      name: "(307) Nautico",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Centro Lago Mall : Av. 2 El Milagro. Centro Comercial Lago Mall. Maracaibo - Edo. Zulia",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "e64ee8cf-9ba5-4aac-b042-c02c1ff0996b",
      name: "(308) Curva De Molina",
      address: "Av. 28 (La Limpia) Con Calle 79, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "4363b144-b7c2-4153-8e7e-f79c2d301f70",
      name: "(309) Sabaneta",
      address: "Av. Principal Sabaneta, Centro Comercial Centro Del Sol, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "1f046275-8974-4456-9255-69131e2253ad",
      name: "(311) Calle 72",
      address: "Calle 72 Esquina Av. 3G Sector La Lago, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "3c317a13-074b-40d5-b8ee-c80f622209fb",
      name: "(312) San Miguel",
      address: "Circunvalación No. 2, Centro Comercial Ogaret Shopping Center Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "466397ac-e53b-4c1e-a0ea-ce90f06d478c",
      name: "(313) Maracaibo Zona Industrial",
      address: "Av. Circunvalación 2, Diagonal Al Hotel Maruma, Frente A La Estación De Servicio Móvil Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "bc6f7dcb-54dc-48e7-8a2c-8bbadef6a82b",
      name: "(314) Las Mercedes",
      address: "Av. Bella Vista, Esquina Av. Universidad Edificio Las Mercedes, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "ec477984-62dc-4ca0-9cc9-335981099876",
      name: "(315) El Transito",
      address: "Av. 28 La Limpia, Antiguo Bambi, Sector Los Postes Negros, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "f63d6f5a-fba9-4f58-9070-47a855ca8bdb",
      name: "(316) Sambil Maracaibo",
      address: "Av. Guajira, Centro Sambil Maracaibo, Nivel Lago, Entrada Guajira, Locales L1 Y L2, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "b88d710d-885d-42a0-ad4b-bc1bf71e7dec",
      name: "(317) Puertos De Altagracia",
      address: "Av. 6 Con Prolongación Calle 6 Los Puertos De Altagracia, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.PUERTOSDEALTAGRACIA)[0].id
  },
  {
      id: "8783ba45-fab8-4bd0-9c05-9e384f66b48e",
      name: "(318) El Saman",
      address: "El Samán Entre Los Km. 9 Y 11, con Av. 50 Con Calle 200 De La Urbanización El Caujaro, San Francisco, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANFRANCISCOMARACAIBO)[0].id
  },
  {
      id: "8ad78ad8-b77b-4988-a1c2-60c0f4f81381",
      name: "(319) Mercamara",
      address: "Vía Palíto Blanco, Mercado De Mayorista, Maracaibo, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "c1f42684-74b1-497b-9fce-aeef8ac97e1a",
      name: "(321) Santa Rita",
      address: "Av. Pedro Lucas Urribarri, Sede De La Alcaldía Del Municipio Santa Rita, Santa Rita, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANTARITA)[0].id
  },
  {
      id: "49c2facc-1916-45c1-9c44-f82a439f338a",
      name: "(322) Caja Seca",
      address: "Carretera Panamericana, Frente A La Plaza Silsa Caja Seca, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CAJASECA)[0].id
  },
  {
      id: "5f8337ab-1c1d-4d4a-85ed-926d1d505560",
      name: "(323) El Mojan",
      address: "Av. 7 (Principal) Con Calle 24, El Moja, Estado Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANRAFAELDELMOJAN)[0].id
  },
  {
      id: "a8302fd0-065e-4d11-8037-aae664ce8949",
      name: "(324) Av. Blandin Chacao",
      address: "Torre La Castellana Edf. Anexo Entre Calle Mohedano Y Blandin Planta Baja La Castellana., Caracas.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "d89ad8ca-49fe-401c-a5c1-76816dba2ccb",
      name: "(325) La Castellana",
      address: "(*)Agencia Cerrada Temporalmente, sus Clientes serán Atendidos en la Agencia Av Blandin ubicada en la Torre La Castellana Edf. Anexo Entre Calle Mohedano Y Blandin Planta Baja La\n                  Castellana., Caracas.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "52efb8c5-9864-437d-9f9c-1ff5188d15d4",
      name: "(326) El Menito",
      address: "Sector El Menito. Edificio PDVSA. Módulo 1 Lagunillas - Edo. Zulia.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAGUNILLAS)[0].id
  },
  {
      id: "7219917a-f158-4c73-9d81-ac8936cca59c",
      name: "(327) Puerto De Maracaibo",
      address: "Av 2 El Milagro Puerto De Maracaibo, Parroquia Santa Lucia, Municipio Maracaibo, Maracaibo, Estado Zulia",
      cityId: cities.filter(city => city.name === cityOnlyNames.MARACAIBO)[0].id
  },
  {
      id: "a44c4c0a-3356-4ca5-8894-95e1dd3f9722",
      name: "(328) Campo Alegre",
      address: "Av. Francisco De Miranda, Torre Europa, Mezz. Norte, Urb. Campo Alegre. Caracas, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "130fcc22-67bd-414a-aa36-7bca91e71bef",
      name: "(328) Taquilla Alcaldia Chacao",
      address: "Av. Venezuela con Calle Sorocaima, Torre Atrium, PB El Rosal Municipio Chacao, Estado Miranda",
      cityId: cities.filter(city => city.name === cityOnlyNames.CARACAS)[0].id
  },
  {
      id: "eb779aca-bfb6-4879-b67b-c06ca3c25f15",
      name: "(534) Caucagua",
      address: "Calle Acevedo Al Lado De La Casa Parroquial, Caucagua, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.CAUCAGUA)[0].id
  },
  {
      id: "eac2e623-74c7-4a5f-8ff1-2ed574fb1b45",
      name: "(535) Rio Chico",
      address: "Calle Bolívar Con Calle Junín N° 148, San José De Barlovento, Parroquia San José de Rio Chico, Estado Miranda.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANJOSEDERIOCHICO)[0].id
  },
  {
      id: "0f15df96-a244-4319-b9d1-2e05304fcf94",
      name: "(541) La Vela",
      address: "C.C. La Vela C/Los Uveros Av. Guayacan Porlamar, Nueva Esparta",
      cityId: cities.filter(city => city.name === cityOnlyNames.PORLAMAR)[0].id
  },
  {
      id: "4a2a3f4e-c1ac-4177-9cd8-2e4900b6f2c0",
      name: "(550) Santa Isabel",
      address: "Calle Principal De Santa Isabel, Edificio Don Joaquín P.B, Santa Isabel, Municipio Andrés Bello, Estado Trujillo.",
      cityId: cities.filter(city => city.name === cityOnlyNames.SANTAISABEL)[0].id
  },
  {
      id: "bed60787-5a8d-43e7-9236-959b4293ce16",
      name: "(552) Naiguata",
      address: "Av. José María Vargas, Eificio Tina, P.B., Naiguatá, Estado La Guaira.",
      cityId: cities.filter(city => city.name === cityOnlyNames.LAGUAIRA)[0].id
  }
]

const parsedSite = sites.map(item => {
  const codigo = item.name.match(/\(([^)]+)\)/)[1];
  const nombre = item.name.replace(/\([^)]+\)\s*/, "");
  
  return {
    ...item,
    codigo: `(${codigo})`,
    name: nombre
  };
});

module.exports = {parsedSite, siteOnlyNames}