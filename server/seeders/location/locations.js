const {parsedSite, siteOnlyNames} = require("./sites")
const {typeOfSite, typeOfSiteOnlyName} = require("./typeOfSite")

const siteName = {
    TORREBNC5DEJULIOLOBBY: 'Torre BNC 5 de Julio Lobby',
    TORREBNC5DEJULIOBOVEDA: 'Torre BNC 5 de Julio Bóveda',
    TORREBNC5DEJULIOPISO1: 'Torre BNC 5 de Julio Piso 1',
    TORREBNC5DEJULIOPISO2: 'Torre BNC 5 de Julio Piso 2',
    TORREBNC5DEJULIOPISO2MONITOREO: 'Torre BNC 5 de Julio Piso 2 Monitoreo',
    TORREBNC5DEJULIOPISO3: 'Torre BNC 5 de Julio Piso 3',
    TORREBNC5DEJULIOPISO3TELCO: 'Torre BNC 5 de Julio Piso 3 Telco',
    TORREBNC5DEJULIOPISO4: 'Torre BNC 5 de Julio Piso 4',
    TORREBNC5DEJULIOPISO5: 'Torre BNC 5 de Julio Piso 5',
    TORREBNC5DEJULIOPISO6: 'Torre BNC 5 de Julio Piso 6',
    TORREBNC5DEJULIOPISO7: 'Torre BNC 5 de Julio Piso 7',
    TORREBNC5DEJULIOPISO8: 'Torre BNC 5 de Julio Piso 8',
    TORREBNC5DEJULIOPISO9: 'Torre BNC 5 de Julio Piso 9',
    TORREBNC5DEJULIOPISO10: 'Torre BNC 5 de Julio Piso 10',
    TORREBNC5DEJULIOPISO11: 'Torre BNC 5 de Julio Piso 11',
    TORREBNC5DEJULIOPISO12: 'Torre BNC 5 de Julio Piso 12',
    TORREBNC5DEJULIOPISO13: 'Torre BNC 5 de Julio Piso 13',
    TORREBNC5DEJULIOSALASDECONFERENCIA: 'Torre BNC 5 de Julio Salas de Conferencia'
  }
  
const siteMCBOlocation = [
    {
      id: 'b72b6168-440f-42c0-8d53-3f0c6ca850d5', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Lobby', 
      subnet: '10.0.10.0'
    },
    {
      id: '4d186cc3-a7e7-4ea6-9de1-22bccfbeda13', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Bóveda', 
      subnet: '10.0.10.0'
    },
    {
      id: 'e45cc514-4cb7-4486-b0c4-d073caf8e6a6', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 1', 
      subnet: '10.0.11.0'
    },
    {
      id: 'e4bac818-d690-4a2d-9847-9d045677daf1', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 2', 
      subnet: '10.0.12.0'
    },
    {
      id: 'e610356f-e8e9-4cbe-a1ef-c20cf6d7f52f', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 2 Monitoreo', 
      subnet: '10.0.41.0'
    },
    {
      id: 'e2237cf9-5de6-4cee-a0b6-57c92f8207ad', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 3', 
      subnet: '10.0.13.0'
    },
    {
      id: 'edbc2df7-b595-4537-9b1b-b7587860bc1e', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 3 Telco', 
      subnet: '10.0.0.0'
    },
    {
      id: 'd24379da-88f9-493c-b336-ae4a64dc579b', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 4', 
      subnet: '10.0.14.0'
    },
    {
      id: 'aade133a-ff8b-4093-813e-251cd7cfb060', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 5', 
      subnet: '10.0.15.0'
    },
    {
      id: '415ff29d-b076-45de-abcd-c36e083b983a', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 6', 
      subnet: '10.0.16.0'
    },
    {
      id: '50b149e9-44c8-4bd1-a2d4-f76bd3797498', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 7', 
      subnet: '10.0.17.0'
    },
    {
      id: '89cdbe96-9f68-4623-b1e6-4735fe9b26f1', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 8', 
      subnet: '10.0.18.0'
    },
    {
      id: '56be6613-48a9-419d-8003-7f505c30beb1', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 9', 
      subnet: '10.0.19.0'
    },
    {
      id: 'a50deb49-66cc-420e-8351-79e4d53cbf01', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 10', 
      subnet: '10.0.20.0'
    },
    {
      id: '85eb0152-4196-4b80-9744-b32688202c4e', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 11', 
      subnet: '10.0.21.0'
    },
    {
      id: '1ac38854-738e-4f43-957a-af8ae3a63efc', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 12', 
      subnet: '10.0.21.0'
    },
    {
      id: 'd32acb33-7389-48db-b32d-6056de70c221', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Piso 13', 
      subnet: '10.0.21.0'
    },
    {
      id: '23ae22e1-7426-460d-97b6-c89ca0c55c9f', 
      typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.SEDE)[0].id, 
      siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
      name: 'Torre BNC 5 de Julio Salas de Conferencia', 
      subnet: '10.0.150.0'
    }   
  ]

  const almacenName = { TORREBNC5DEJULIOALMACENPISO1: 'Torre BNC 5 de Julio Almacen Piso 1' }
  const almacenes = [    
    {
        id: '4c1beaf2-64e3-4c3c-8e9f-ef18767d18ab', 
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.ALMACEN)[0].id, 
        siteId: parsedSite.filter(site => site.name === siteOnlyNames.MARACAIBO5DEJULIO)[0].id, 
        name: 'Torre BNC 5 de Julio Almacen Piso 1', 
        subnet: null
      }, 
  ]

  const agenciaName ={
    'AGENCIA(001)': 'Agencia (001) San Bernardino',
    'AGENCIA(010)': 'Agencia (010) Traki San Martín',
    'AGENCIA(011)': 'Agencia (011) La Candelaria Casabera',
    'AGENCIA(011)': 'Agencia (011) Taquilla Hosp. Ortopédico Infantil',
    'AGENCIA(012)': 'Agencia (012) La Urbina',
    'AGENCIA(013)': 'Agencia (013) Catia Boulevard',
    'AGENCIA(014)': 'Agencia (014) Charallave',
    'AGENCIA(015)': 'Agencia (015) Ciudad Ojeda Centro',
    'AGENCIA(016)': 'Agencia (016) Los Taques Falcón',
    'AGENCIA(018)': 'Agencia (018) Santa Teresa del Tuy',
    'AGENCIA(019)': 'Agencia (019) Guarenas',
    'AGENCIA(020)': 'Agencia (020) Palo Negro Súper Líder',
    'AGENCIA(021)': 'Agencia (021) Maracay C.C. Platinium',
    'AGENCIA(025)': 'Agencia (025) San Juan de Los Morros',
    'AGENCIA(028)': 'Agencia (028) Casacoima Delta Amacuro',
    'AGENCIA(029)': 'Agencia (029) Tucupido Guarico',
    'AGENCIA(030)': 'Agencia (030) Maracaibo Las Delicias',
    'AGENCIA(030)': 'Agencia (030) Taquilla Alcaldia de Maracaibo',
    'AGENCIA(031)': 'Agencia (031) Maracaibo II Bella Vista',
    'AGENCIA(032)': 'Agencia (032) La Limpia',
    'AGENCIA(035)': 'Agencia (035) El Hatillo',
    'AGENCIA(036)': 'Agencia (036) San Jorge - El Cementerio',
    'AGENCIA(040)': 'Agencia (040) San Cristóbal',
    'AGENCIA(042)': 'Agencia (042) Traki Valle de la Pascua',
    'AGENCIA(043)': 'Agencia (043) San Antonio de Los Altos',
    'AGENCIA(044)': 'Agencia (044) San Felix',
    'AGENCIA(045)': 'Agencia (045) unare',
    'AGENCIA(047)': 'Agencia (047) Altavista',
    'AGENCIA(049)': 'Agencia (049) Aeropuerto Caracas',
    'AGENCIA(050)': 'Agencia (050) Parque Cristal',
    'AGENCIA(050)': 'Agencia (050) Taquilla Club Hebraica',
    'AGENCIA(051)': 'Agencia (051) Eurobuilding',
    'AGENCIA(052)': 'Agencia (052) Altamira',
    'AGENCIA(053)': 'Agencia (053) San Román',
    'AGENCIA(054)': 'Agencia (054) Centro Comercial Alto Prado',
    'AGENCIA(055)': 'Agencia (055) C.C. Ciudad Tamanaco',
    'AGENCIA(056)': 'Agencia (056) La Guaira',
    'AGENCIA(057)': 'Agencia (057) Plaza Las Américas',
    'AGENCIA(059)': 'Agencia (059) Av. Victoria',
    'AGENCIA(060)': 'Agencia (060) Capanaparo',
    'AGENCIA(063)': 'Agencia (063) Acarigua',
    'AGENCIA(066)': 'Agencia (066) Maracay Torre Sindoni',
    'AGENCIA(067)': 'Agencia (067) Cagua Súper Líder',
    'AGENCIA(068)': 'Agencia (068) Súper Líder El Limón',
    'AGENCIA(069)': 'Agencia (069) Barquisimeto Mercabar',
    'AGENCIA(071)': 'Agencia (071) Puerto Cabello',
    'AGENCIA(073)': 'Agencia (073) Av. Pedro León Torres',
    'AGENCIA(074)': 'Agencia (074) Ciudad Bolívar',
    'AGENCIA(076)': 'Agencia (076) Valencia Sur',
    'AGENCIA(079)': 'Agencia (079) San Sebastián de los Reyes',
    'AGENCIA(080)': 'Agencia (080) Maracay Las Delicias',
    'AGENCIA(081)': 'Agencia (081) Maracay Centro',
    'AGENCIA(082)': 'Agencia (082) Maracay Santos Michelena',
    'AGENCIA(083)': 'Agencia (083) Maracay Alcaldia',
    'AGENCIA(085)': 'Agencia (085) Valencia Bolívar Norte',
    'AGENCIA(088)': 'Agencia (088) Cagua',
    'AGENCIA(089)': 'Agencia (089) Maracay Los Samanes',
    'AGENCIA(091)': 'Agencia (091) Villa de Cura',
    'AGENCIA(093)': 'Agencia (093) Merida Las Americas',
    'AGENCIA(096)': 'Agencia (096) San Antonio del Táchira',
    'AGENCIA(097)': 'Agencia (097) La Quizanda',
    'AGENCIA(098)': 'Agencia (098) El Rosal',
    'AGENCIA(099)': 'Agencia (099) Calabozo',
    'AGENCIA(101)': 'Agencia (101) Maracaibo C.C. Gran Bazar',
    'AGENCIA(102)': 'Agencia (102) Coro Supermercado Eurofalcon',
    'AGENCIA(103)': 'Agencia (103) Puerto La Cruz Av.Alberto Ravell',
    'AGENCIA(104)': 'Agencia (104) Maracay Avenida Vargas',
    'AGENCIA(106)': 'Agencia (106) Carúpano CC Cristal',
    'AGENCIA(107)': 'Agencia (107) Valencia C.C. Concepto La Granja',
    'AGENCIA(108)': 'Agencia (108) Porlamar Alcaldía Mariño',
    'AGENCIA(109)': 'Agencia (109) Bejuma Avenida Los Fundadores',
    'AGENCIA(110)': 'Agencia (110) Puerto Ordaz Continental',
    'AGENCIA(112)': 'Agencia (112) El Vigía',
    'AGENCIA(115)': 'Agencia (115) Alcaldía Casanay',
    'AGENCIA(117)': 'Agencia (117) Valera',
    'AGENCIA(119)': 'Agencia (119) Punto Fijo II',
    'AGENCIA(122)': 'Agencia (122) Coro I - Falcón',
    'AGENCIA(123)': 'Agencia (123) Los Haticos',
    'AGENCIA(124)': 'Agencia (124) C.C. Planeta Sotavento Maiquetía',
    'AGENCIA(125)': 'Agencia (125) Maracaibo 5 De Julio',
    'AGENCIA(126)': 'Agencia (126) Villa Del Rosario',
    'AGENCIA(127)': 'Agencia (127) Valencia Camoruco',
    'AGENCIA(128)': 'Agencia (128) Valencia Centro',
    'AGENCIA(129)': 'Agencia (129) Ciudad Bolívar II',
    'AGENCIA(130)': 'Agencia (130) Club La Lagunita',
    'AGENCIA(133)': 'Agencia (133) Choroní',
    'AGENCIA(135)': 'Agencia (135) Centro Medico Maracay',
    'AGENCIA(137)': 'Agencia (137) Zona Industrialii Barquisimeto',
    'AGENCIA(142)': 'Agencia (142) Los Dos Caminos',
    'AGENCIA(144)': 'Agencia (144) La Victoria C.C. Palma Center',
    'AGENCIA(146)': 'Agencia (146) Porlamar - Margarita',
    'AGENCIA(148)': 'Agencia (148) Las Garcitas Valencia',
    'AGENCIA(151)': 'Agencia (151) Maturin II',
    'AGENCIA(152)': 'Agencia (152) C.C. Babilón Centro Sur',
    'AGENCIA(153)': 'Agencia (153) La Trinidad Zona Industrial',
    'AGENCIA(153)': 'Agencia (153) Taquilla Centro Italo Venezolano',
    'AGENCIA(155)': 'Agencia (155) Eurobuilding Puerto Ordaz',
    'AGENCIA(156)': 'Agencia (156) Eurobuilding Barinas',
    'AGENCIA(159)': 'Agencia (159) Club Puerto Azul',
    'AGENCIA(161)': 'Agencia (161) Porlamar Centro',
    'AGENCIA(162)': 'Agencia (162) Ciudad Ojeda',
    'AGENCIA(163)': 'Agencia (163) Centro Comercial Los Teques',
    'AGENCIA(164)': 'Agencia (164) El Sombrero',
    'AGENCIA(165)': 'Agencia (165) Centro Comercial Metrópolis',
    'AGENCIA(166)': 'Agencia (166) Santa Mónica',
    'AGENCIA(168)': 'Agencia (168) C.C. Metrópolis Valencia',
    'AGENCIA(169)': 'Agencia (169) Traki Cabimas',
    'AGENCIA(171)': 'Agencia (171) Guatire Av. Intercomunal',
    'AGENCIA(172)': 'Agencia (172) El Tigrito',
    'AGENCIA(175)': 'Agencia (175) La Morita',
    'AGENCIA(176)': 'Agencia (176) Lecheria',
    'AGENCIA(178)': 'Agencia (178) Traki Cumaná',
    'AGENCIA(181)': 'Agencia (181) San Ignacio',
    'AGENCIA(184)': 'Agencia (184) La Candelaria Casa Italia',
    'AGENCIA(185)': 'Agencia (185) El Viñedo',
    'AGENCIA(192)': 'Agencia (192) Maracaibo III',
    'AGENCIA(194)': 'Agencia (194) San Felipe',
    'AGENCIA(196)': 'Agencia (196) Barinas',
    'AGENCIA(197)': 'Agencia (197) Charallave C.C. Súper Líder',
    'AGENCIA(199)': 'Agencia (199) Turmero C. C. Mariño Plaza',
    'AGENCIA(202)': 'Agencia (202) Yaritagua Hyper Líder',
    'AGENCIA(203)': 'Agencia (203) San Diego Supermercado Híper Líder',
    'AGENCIA(206)': 'Agencia (206) San Fernando de Apure',
    'AGENCIA(207)': 'Agencia (207) Hiperlider Cabudare',
    'AGENCIA(208)': 'Agencia (208) San Carlos',
    'AGENCIA(209)': 'Agencia (209) Tucupita Traki',
    'AGENCIA(210)': 'Agencia (210) Dabajuro II',
    'AGENCIA(213)': 'Agencia (213) TRAKI San Fernando de Apure',
    'AGENCIA(214)': 'Agencia (214) Centro Residencial Solano',
    'AGENCIA(215)': 'Agencia (215) Sambil Valencia',
    'AGENCIA(216)': 'Agencia (216) Excelsior Gama Santa Fe',
    'AGENCIA(217)': 'Agencia (217) Excelsior Gama Santa Eduvigis',
    'AGENCIA(218)': 'Agencia (218) C.C La Viña Valencia',
    'AGENCIA(219)': 'Agencia (219) Hiper Lider Araure',
    'AGENCIA(220)': 'Agencia (220) Boleita',
    'AGENCIA(221)': 'Agencia (221) Unicentro Maracay',
    'AGENCIA(230)': 'Agencia (230) Anaco Av. Mérida',
    'AGENCIA(231)': 'Agencia (231) Puerto PÍritu',
    'AGENCIA(233)': 'Agencia (233) Barcelona Centro',
    'AGENCIA(234)': 'Agencia (234) El Tigre',
    'AGENCIA(235)': 'Agencia (235) Lechería Centro Empresarial',
    'AGENCIA(236)': 'Agencia (236) San Fernando De Apure Intercomunal',
    'AGENCIA(237)': 'Agencia (237) Maracay Av. Aragua',
    'AGENCIA(238)': 'Agencia (238) Palo Negro Plaza Bolívar',
    'AGENCIA(239)': 'Agencia (239) C.C. La Victoria',
    'AGENCIA(240)': 'Agencia (240) La Morita Intercomunal',
    'AGENCIA(241)': 'Agencia (241) Alto Barinas',
    'AGENCIA(242)': 'Agencia (242) Puerto Ordaz Castillito',
    'AGENCIA(243)': 'Agencia (243) Guacara',
    'AGENCIA(244)': 'Agencia (244) Tocuyito',
    'AGENCIA(245)': 'Agencia (245) Naguanagua Av. Universidad',
    'AGENCIA(246)': 'Agencia (246) Montalbán',
    'AGENCIA(247)': 'Agencia (247) Metroplaza',
    'AGENCIA(248)': 'Agencia (248) Santa Rosa',
    'AGENCIA(249)': 'Agencia (249) San Jose De Tarbes',
    'AGENCIA(251)': 'Agencia (251) Candelaria Valencia',
    'AGENCIA(252)': 'Agencia (252) Instituto Autonomo El Puerto',
    'AGENCIA(253)': 'Agencia (253) Tinaquillo',
    'AGENCIA(254)': 'Agencia (254) Av.Universidad',
    'AGENCIA(255)': 'Agencia (255) San Martin C.C. Los Molinos',
    'AGENCIA(256)': 'Agencia (256) Catia Av Sucre',
    'AGENCIA(257)': 'Agencia (257) La Yaguara Av. Principal',
    'AGENCIA(258)': 'Agencia (258) El Paraíso',
    'AGENCIA(259)': 'Agencia (259) City Market',
    'AGENCIA(260)': 'Agencia (260) Universidad Catolica Andres Bello',
    'AGENCIA(261)': 'Agencia (261) Quinta Crespo',
    'AGENCIA(262)': 'Agencia (262) Sambil Paraguaná',
    'AGENCIA(263)': 'Agencia (263) Punto Fijo Av Jacinto Lara',
    'AGENCIA(264)': 'Agencia (264) Barquisimeto Av. Vargas',
    'AGENCIA(265)': 'Agencia (265) Sambil Barquisimeto',
    'AGENCIA(266)': 'Agencia (266) Barquisimeto Zona Industrial',
    'AGENCIA(267)': 'Agencia (267) QuÍbor',
    'AGENCIA(268)': 'Agencia (268) Carora',
    'AGENCIA(269)': 'Agencia (269) Mérida Viaducto',
    'AGENCIA(270)': 'Agencia (270) Paseo Las Mercedes',
    'AGENCIA(271)': 'Agencia (271) Cumbres De Curumo',
    'AGENCIA(272)': 'Agencia (272) C.C. La Cascada',
    'AGENCIA(273)': 'Agencia (273) Sambil Caracas',
    'AGENCIA(274)': 'Agencia (274) Los Cortijos',
    'AGENCIA(275)': 'Agencia (275) Guarenas C.C. Miranda',
    'AGENCIA(276)': 'Agencia (276) El Marques',
    'AGENCIA(277)': 'Agencia (277) Macaracuay',
    'AGENCIA(279)': 'Agencia (279) Guatire CC Buenaventura',
    'AGENCIA(280)': 'Agencia (280) Centro Comercial Parque Costa Azul',
    'AGENCIA(281)': 'Agencia (281) Sambil Margarita',
    'AGENCIA(282)': 'Agencia (282) Juan Griego',
    'AGENCIA(283)': 'Agencia (283) Guanare',
    'AGENCIA(284)': 'Agencia (284) Turen',
    'AGENCIA(285)': 'Agencia (285) Cumana',
    'AGENCIA(286)': 'Agencia (286) Sambil San Cristobal',
    'AGENCIA(287)': 'Agencia (287) San Cristobal 7ma. Avenida',
    'AGENCIA(288)': 'Agencia (288) Bocono',
    'AGENCIA(289)': 'Agencia (289) Carvajal',
    'AGENCIA(290)': 'Agencia (290) Sabana De Mendoza',
    'AGENCIA(291)': 'Agencia (291) Trujillo',
    'AGENCIA(292)': 'Agencia (292) Valera La Plata',
    'AGENCIA(293)': 'Agencia (293) Valera La Puerta',
    'AGENCIA(294)': 'Agencia (294) Catia La Mar',
    'AGENCIA(295)': 'Agencia (295) El Junquito',
    'AGENCIA(296)': 'Agencia (296) Mene Grande',
    'AGENCIA(297)': 'Agencia (297) Cabimas Av. Independencia',
    'AGENCIA(298)': 'Agencia (298) Santa Bárbara',
    'AGENCIA(299)': 'Agencia (299) La Concepción',
    'AGENCIA(300)': 'Agencia (300) Casigua',
    'AGENCIA(301)': 'Agencia (301) Machiques',
    'AGENCIA(302)': 'Agencia (302) Carrasquero',
    'AGENCIA(303)': 'Agencia (303) Maracaibo Norte',
    'AGENCIA(304)': 'Agencia (304) Indio Mara',
    'AGENCIA(305)': 'Agencia (305) Galerías Mall - Mcbo',
    'AGENCIA(306)': 'Agencia (306) Centro Lago Mall',
    'AGENCIA(307)': 'Agencia (307) Nautico',
    'AGENCIA(308)': 'Agencia (308) Curva De Molina',
    'AGENCIA(309)': 'Agencia (309) Sabaneta',
    'AGENCIA(311)': 'Agencia (311) Calle 72',
    'AGENCIA(312)': 'Agencia (312) San Miguel',
    'AGENCIA(313)': 'Agencia (313) Maracaibo Zona Industrial',
    'AGENCIA(314)': 'Agencia (314) Las Mercedes',
    'AGENCIA(315)': 'Agencia (315) El Transito',
    'AGENCIA(316)': 'Agencia (316) Sambil Maracaibo',
    'AGENCIA(317)': 'Agencia (317) Puertos De Altagracia',
    'AGENCIA(318)': 'Agencia (318) El Saman',
    'AGENCIA(319)': 'Agencia (319) Mercamara',
    'AGENCIA(321)': 'Agencia (321) Santa Rita',
    'AGENCIA(322)': 'Agencia (322) Caja Seca',
    'AGENCIA(323)': 'Agencia (323) El Mojan',
    'AGENCIA(324)': 'Agencia (324) Av. Blandin Chacao',
    'AGENCIA(325)': 'Agencia (325) La Castellana',
    'AGENCIA(326)': 'Agencia (326) El Menito',
    'AGENCIA(327)': 'Agencia (327) Puerto De Maracaibo',
    'AGENCIA(328)': 'Agencia (328) Campo Alegre',
    'AGENCIA(328)': 'Agencia (328) Taquilla Alcaldia Chacao',
    'AGENCIA(534)': 'Agencia (534) Caucagua',
    'AGENCIA(535)': 'Agencia (535) Rio Chico',
    'AGENCIA(541)': 'Agencia (541) La Vela',
    'AGENCIA(550)': 'Agencia (550) Santa Isabel',
    'AGENCIA(552)': 'Agencia (552) Naiguata'
  }
  const agenciasSite = [
      {
        id: "658bcab2-ab6f-4c50-8957-1dd9cb608845",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "42d72c21-c2ae-43b0-bdd3-eb982f5ccc25",
        name: "Agencia (001) San Bernardino",
        subnet: null
    },
    {
        id: "52c36807-a95b-41ab-b472-b6d538bd5ba0",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c34c9d5c-e4a1-4eaa-9221-af20914d372d",
        name: "Agencia (010) Traki San Martín",
        subnet: null
    },
    {
        id: "bc6b5b73-a557-4a98-a112-739ba224cd8c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7a410260-b82b-445c-8cbe-6393860f51b9",
        name: "Agencia (011) La Candelaria Casabera",
        subnet: null
    },
    {
        id: "def2da4e-1862-4239-a225-10a6007bccac",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7d428e9a-5f9b-426a-96c4-2d782b968557",
        name: "Agencia (011) Taquilla Hosp. Ortopédico Infantil",
        subnet: null
    },
    {
        id: "9343d2d4-a0cf-4b87-937d-f8533cfe24d7",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "43f0cc5c-82c0-468d-a081-5c0f60cc9b65",
        name: "Agencia (012) La Urbina",
        subnet: null
    },
    {
        id: "57789034-b182-4bf8-bb61-dc9452c44885",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "acda7879-99dc-474f-a020-98fce149db91",
        name: "Agencia (013) Catia Boulevard",
        subnet: null
    },
    {
        id: "476559c9-3a15-4f4e-85f8-8cb73f60e737",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "757a1de3-2cb6-4b70-89e2-02caf6402375",
        name: "Agencia (014) Charallave",
        subnet: null
    },
    {
        id: "c76d7e94-5ad8-429b-9604-91839c66f5f1",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9d6a523c-62e9-449a-b7eb-6845c5e6a390",
        name: "Agencia (015) Ciudad Ojeda Centro",
        subnet: "10.84.27.31"
    },
    {
        id: "528d64f8-1884-4c04-89c1-4d7a0e20b464",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a47bf4ee-bb54-46db-bc0c-a6dd0d09f3a1",
        name: "Agencia (016) Los Taques Falcón",
        subnet: null
    },
    {
        id: "0ca0d99b-5efa-4ad0-bb2e-47363f2cc06f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "0a8426ad-8853-4a7e-a87d-f6c9c46751fe",
        name: "Agencia (018) Santa Teresa del Tuy",
        subnet: null
    },
    {
        id: "06d0765e-290f-4e6c-af62-6ea28ab96c5d",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "df2c9155-f39a-436a-9960-b33052bffb41",
        name: "Agencia (019) Guarenas",
        subnet: null
    },
    {
        id: "b47248cb-eb04-4e8d-9361-a7397d9719da",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "87910a94-6e32-422e-8301-04da34d207b2",
        name: "Agencia (020) Palo Negro Súper Líder",
        subnet: null
    },
    {
        id: "9da3f5c0-2305-445b-baa1-d7788ca49bfd",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c616e6d9-e949-4884-aadb-b33c29eed212",
        name: "Agencia (021) Maracay C.C. Platinium",
        subnet: null
    },
    {
        id: "4d0ed0b9-1644-4b55-b322-958f0deb3692",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ed5e943f-e3e4-4e4b-a71c-44c7ef505b30",
        name: "Agencia (025) San Juan de Los Morros",
        subnet: null
    },
    {
        id: "4762b7b7-2a6b-4c7b-9601-90d8aee4cf5e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d4a29b79-a868-47bd-9ebf-c3409c160837",
        name: "Agencia (028) Casacoima Delta Amacuro",
        subnet: null
    },
    {
        id: "a9ec9b9f-33d2-4d76-856d-dcdd06684991",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "6468d553-1193-414c-9a14-95bce1085467",
        name: "Agencia (029) Tucupido Guarico",
        subnet: null
    },
    {
        id: "bd23accb-5c77-4395-8fd8-86304c3883eb",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4017ad67-118b-4984-8386-ab60dab71d29",
        name: "Agencia (030) Maracaibo Las Delicias",
        subnet: "192.168.18.4"
    },
    {
        id: "8b09440b-5729-483b-8303-61c9aa1a81fa",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "48e6c0ac-24f5-4501-9173-76286bbcc846",
        name: "Agencia (030) Taquilla Alcaldia de Maracaibo",
        subnet: "192.168.18.4"
    },
    {
        id: "8326d847-4632-42d8-b96c-4586e7aec7d6",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "db9601aa-26f3-468a-b182-956534bf1666",
        name: "Agencia (031) Maracaibo II Bella Vista",
        subnet: "10.84.4.20"
    },
    {
        id: "c0bd7ae4-7c12-419e-b12e-0f1535719a9b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ca62f769-734b-4c75-b159-c50fd9fe8dff",
        name: "Agencia (032) La Limpia",
        subnet: "192.168.61.98"
    },
    {
        id: "35ada4cb-9c5d-4dc1-9feb-9d21b85cbb98",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "01e99f6f-d260-4ac4-8cb5-893e6ce3bd08",
        name: "Agencia (035) El Hatillo",
        subnet: null
    },
    {
        id: "51c3b2af-762a-4850-858d-15efa32a3ccf",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "670b49a3-ca75-4053-b6ae-4f212f31c6e2",
        name: "Agencia (036) San Jorge - El Cementerio",
        subnet: null
    },
    {
        id: "fa05293b-247d-4948-a67b-2c343366f040",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7a69868e-a8dd-4eaa-8209-3808b4fefaf5",
        name: "Agencia (040) San Cristóbal",
        subnet: "192.168.19.28"
    },
    {
        id: "0a8ab3c4-38ec-4970-b6bd-4fcc4739b5dc",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a2d084f5-50e2-4d32-b592-9d7e9420c57c",
        name: "Agencia (042) Traki Valle de la Pascua",
        subnet: null
    },
    {
        id: "d4bea094-c748-4f6a-9a12-ca5d758d0284",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "6108b00b-639c-4023-b26b-f8d2f9fd65e4",
        name: "Agencia (043) San Antonio de Los Altos",
        subnet: null
    },
    {
        id: "3592c703-a1a7-47a8-9f74-ce7cce03abc6",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "732f5bad-6afb-4ab3-abaf-c73f5bfd2d15",
        name: "Agencia (044) San Felix",
        subnet: null
    },
    {
        id: "3cd8644f-8547-48ae-9084-e6473489cb47",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "17e54fe7-d471-45d1-ba11-6273167eac2c",
        name: "Agencia (045) unare",
        subnet: null
    },
    {
        id: "17194a18-4ef6-44d4-9f53-ec32a9fc946f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "90ff1732-1690-4d33-8cf0-6f7d6947423d",
        name: "Agencia (047) Altavista",
        subnet: null
    },
    {
        id: "fc56025e-baec-4a30-bc4e-67d0dea50850",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9a20395d-990d-45a2-b7a6-2435bbd68eb1",
        name: "Agencia (049) Aeropuerto Caracas",
        subnet: null
    },
    {
        id: "f45ba700-ce58-4360-a92a-50ab2dc9fd50",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ddaa8e08-fc6f-4e94-a767-afdfe7d466e5",
        name: "Agencia (050) Parque Cristal",
        subnet: null
    },
    {
        id: "045780d7-239d-478a-b73f-c93568b8c45b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7958550a-4b34-44d1-a572-6d5a0fbb7051",
        name: "Agencia (050) Taquilla Club Hebraica",
        subnet: null
    },
    {
        id: "f48ef3d2-1763-490a-b14d-ca88f5d552af",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "cf17b86c-2d77-482b-9de0-ee0e9b81f52a",
        name: "Agencia (051) Eurobuilding",
        subnet: null
    },
    {
        id: "73a63627-f571-4edf-b3ea-7b1709351e06",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "5f610b87-54a0-49fd-b3f2-f58a1af040a8",
        name: "Agencia (052) Altamira",
        subnet: null
    },
    {
        id: "2f181e8a-43cb-49c3-b235-1bee80b9457c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "8566961a-3b51-4bac-8f7f-8bceb8f82fda",
        name: "Agencia (053) San Román",
        subnet: null
    },
    {
        id: "065e1179-6678-418d-afff-8afb753798b6",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4066b7c7-2ed6-42d4-a589-1f867ac7fd48",
        name: "Agencia (054) Centro Comercial Alto Prado",
        subnet: null
    },
    {
        id: "450ba208-268e-48e7-9067-c027a0ec4ecc",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d0b6c028-6df1-4718-88b5-ce3933fd4e7d",
        name: "Agencia (055) C.C. Ciudad Tamanaco",
        subnet: null
    },
    {
        id: "c4cd0e38-a6a8-43b7-8642-3cab2be570fa",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "722ae278-8799-4d10-bbba-b96e197b3bc2",
        name: "Agencia (056) La Guaira",
        subnet: null
    },
    {
        id: "7291f82e-c939-4cda-b333-951766a0947b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c04a89af-8169-415a-a9fd-83656beefea5",
        name: "Agencia (057) Plaza Las Américas",
        subnet: null
    },
    {
        id: "f7745468-a15f-49af-a8fc-c567de1a8dfa",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3c5e6f8f-dc1b-4bd1-ae44-8bb90b849ad4",
        name: "Agencia (059) Av. Victoria",
        subnet: null
    },
    {
        id: "4b5e0474-04c9-42b2-b07f-50c320398453",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ea1e48bc-cdc7-4f7e-acf3-20e4d12661fe",
        name: "Agencia (060) Capanaparo",
        subnet: null
    },
    {
        id: "9897f478-96b2-4900-b444-58c118f01160",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ae191918-afda-4d45-9389-ad54a5ebf53f",
        name: "Agencia (063) Acarigua",
        subnet: null
    },
    {
        id: "6d30edad-2881-4b10-911d-73dc2998c2de",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "5fbbef50-3b4f-4573-89a7-16aa78c58844",
        name: "Agencia (066) Maracay Torre Sindoni",
        subnet: null
    },
    {
        id: "09ff17e2-7c21-4759-901a-59be6ba35e48",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "011369d5-ba47-40d0-800a-88b30d31a315",
        name: "Agencia (067) Cagua Súper Líder",
        subnet: null
    },
    {
        id: "d34f57fc-74d3-41a4-8e84-9ada0ce3025b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7b4a09ca-44a7-4ab2-93b5-a187711f6fb2",
        name: "Agencia (068) Súper Líder El Limón",
        subnet: null
    },
    {
        id: "397e5683-cea0-4c16-a2bf-4491fb579b06",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a7669aa3-430e-4d36-8c53-3082b12aa933",
        name: "Agencia (069) Barquisimeto Mercabar",
        subnet: null
    },
    {
        id: "48ad1912-8800-4bea-8168-a8b5c8c9dadb",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "606ffd38-6d67-435e-bbd6-160371a8a0d3",
        name: "Agencia (071) Puerto Cabello",
        subnet: null
    },
    {
        id: "405a54bb-8eab-4d4e-94fd-cb0c64ea42c0",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "70736201-6c72-42a5-8d78-b2e25fab251b",
        name: "Agencia (073) Av. Pedro León Torres",
        subnet: null
    },
    {
        id: "17e0a852-0a0c-4ece-9418-8c968ee256bf",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3ed5c03d-ab0d-43dd-add7-338969f28af3",
        name: "Agencia (074) Ciudad Bolívar",
        subnet: null
    },
    {
        id: "8bb1c3dd-28bf-4e96-aa3c-bf7e57ec1c7a",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9d83864c-00c3-4bec-821a-536458efd823",
        name: "Agencia (076) Valencia Sur",
        subnet: null
    },
    {
        id: "5c5a7269-87bb-4184-b35c-a2b68e2696bc",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "92ece1a7-e288-4fe1-a174-c54bc2eb9886",
        name: "Agencia (079) San Sebastián de los Reyes",
        subnet: null
    },
    {
        id: "a088c404-97b5-4f17-bb49-37078aa4ca44",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "30f81e69-4fc6-4cf1-a437-42cc977fdca4",
        name: "Agencia (080) Maracay Las Delicias",
        subnet: null
    },
    {
        id: "39c95b0d-eeba-4a17-802d-f9d18b589e1f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "e6f22bd2-1286-42b0-ac3a-a0a6db66d9d0",
        name: "Agencia (081) Maracay Centro",
        subnet: null
    },
    {
        id: "7e40c519-d421-4525-8a18-6fedca4f41ad",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "5e72117c-7201-4ecb-bc08-5f064d194755",
        name: "Agencia (082) Maracay Santos Michelena",
        subnet: null
    },
    {
        id: "69a531a8-5b4c-4bd2-a996-c93cda59f4e2",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "656e6628-b0f6-44e6-95e9-85719e0359d2",
        name: "Agencia (083) Maracay Alcaldia",
        subnet: null
    },
    {
        id: "4bbb1eab-412a-49ef-a53a-a3d2d8d691bb",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "8c5aa2af-d8bf-4e71-8d40-823987e52d7f",
        name: "Agencia (085) Valencia Bolívar Norte",
        subnet: null
    },
    {
        id: "b4eb5013-0a01-4e70-bf0f-d4c04e6ceb10",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c2a6b5f3-3b5f-4cd9-925b-a7e6e8fbda5e",
        name: "Agencia (088) Cagua",
        subnet: null
    },
    {
        id: "535d4c41-8fce-4198-ba20-e02a337966bd",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "31abdf72-e039-402a-a2b3-dff5d7ca5d85",
        name: "Agencia (089) Maracay Los Samanes",
        subnet: null
    },
    {
        id: "485078a9-b335-43b5-b93a-e94d741dfa03",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9c79cc25-f2ac-4b2c-92de-c66a59f1da16",
        name: "Agencia (091) Villa de Cura",
        subnet: null
    },
    {
        id: "de5605db-94a9-4f9a-b51c-c9412c6c4372",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "abbe5b78-53e5-41a3-98e6-72459b3120d3",
        name: "Agencia (093) Merida Las Americas",
        subnet: "10.50.99.26"
    },
    {
        id: "510086a7-f78b-456e-ab07-24eb4d77037d",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "55f91cce-f060-416d-9acd-ce2db41adc2a",
        name: "Agencia (096) San Antonio del Táchira",
        subnet: "192.168.3.14"
    },
    {
        id: "36fe261c-8ae8-4a86-9d3b-c9ccc74a97c5",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c13b5cac-13e8-4046-b836-6ac8aeb4e9a7",
        name: "Agencia (097) La Quizanda",
        subnet: null
    },
    {
        id: "497d60d7-eb71-4ac5-a16a-9104b37720ab",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a28819d2-50d5-4f63-a453-65bd578ac953",
        name: "Agencia (098) El Rosal",
        subnet: null
    },
    {
        id: "91ad4947-d40e-4ca4-89db-1f14a3af2dfe",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "07a5cd7a-ce8e-4ff0-b1ce-59a47591aabd",
        name: "Agencia (099) Calabozo",
        subnet: null
    },
    {
        id: "c9e7ad61-92e8-4ba9-ae1d-0a883f3a4c64",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "69d68ee2-f2fc-45a2-9e1b-b3d7caad1555",
        name: "Agencia (101) Maracaibo C.C. Gran Bazar",
        subnet: null
    },
    {
        id: "af6797da-f85f-47c9-a2b6-c5867f8f4e4c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "cfa640cf-721a-4cb3-8658-959dfcd6e7b2",
        name: "Agencia (102) Coro Supermercado Eurofalcon",
        subnet: "192.168.160.21"
    },
    {
        id: "e7447761-6e9e-4ebb-8ea7-cf02d276660a",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f2c357aa-b951-4dfb-bc35-bc4044a66bd4",
        name: "Agencia (103) Puerto La Cruz Av.Alberto Ravell",
        subnet: null
    },
    {
        id: "33002938-9ba0-4ccf-977b-3b9dd7a5fcff",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "69de91bd-fcf5-41e5-8149-b927436bfbaf",
        name: "Agencia (104) Maracay Avenida Vargas",
        subnet: null
    },
    {
        id: "fdfe1155-1862-462e-88a2-c8e73f070e77",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ee97ef53-fa07-4dcf-91ba-d755698b6bfc",
        name: "Agencia (106) Carúpano CC Cristal",
        subnet: null
    },
    {
        id: "0b38927a-b288-45b1-aa05-79f3737508f1",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "0893c9a4-59ea-436d-8e77-91d80cb29ae8",
        name: "Agencia (107) Valencia C.C. Concepto La Granja",
        subnet: null
    },
    {
        id: "0aaf6721-117c-42a8-8500-9438cb68c499",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7ac4866a-dd3d-4323-bdc6-c14820ac8baf",
        name: "Agencia (108) Porlamar Alcaldía Mariño",
        subnet: null
    },
    {
        id: "5938c433-c0c8-43be-8402-d54b3fe720b1",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d105e3f5-5d15-4020-91e7-112e93b5e1dc",
        name: "Agencia (109) Bejuma Avenida Los Fundadores",
        subnet: null
    },
    {
        id: "f6e96ab9-bfaa-437d-b5c5-0ffa643a80df",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "fa93d201-5441-42d8-9b8f-02956f5b79be",
        name: "Agencia (110) Puerto Ordaz Continental",
        subnet: null
    },
    {
        id: "449b6f7f-246b-43f3-a74d-f5856e63be95",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "31557e6c-ccab-41d5-b57f-d7157de64bfe",
        name: "Agencia (112) El Vigía",
        subnet: "192.168.75.38"
    },
    {
        id: "5d6e212d-bcea-482c-96c6-e755864c0976",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4ac7116f-2848-4f3d-940d-6ec9e102666d",
        name: "Agencia (115) Alcaldía Casanay",
        subnet: null
    },
    {
        id: "1283f6e3-33c3-4842-abe3-83806216a6a6",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9102457f-a925-467a-bd2f-b335cabac38a",
        name: "Agencia (117) Valera",
        subnet: "192.168.76.22"
    },
    {
        id: "4614ec6e-cbc2-4db4-a3bc-7ef8c0b87564",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c26cadca-e563-4cd1-913a-0ca1e19f77b3",
        name: "Agencia (119) Punto Fijo II",
        subnet: "192.168.76.150"
    },
    {
        id: "945b9598-b7d5-4a89-b6f1-f76a4aa86e02",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f2aaf3e2-17de-49bd-8151-cd2cb34da41e",
        name: "Agencia (122) Coro I - Falcón",
        subnet: "192.168.76.177"
    },
    {
        id: "9adcbc81-d8c5-4415-b4ee-2a227c8e49a5",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "94a2b9fa-232b-440b-ad7d-d4d06cce9268",
        name: "Agencia (123) Los Haticos",
        subnet: "10.100.123.13"
    },
    {
        id: "761f3fb9-d199-43ac-a8ba-9ea73028b870",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "e16be78d-30f0-40ea-8b8f-0120f6964bb6",
        name: "Agencia (124) C.C. Planeta Sotavento Maiquetía",
        subnet: null
    },
    {
        id: "b64cca83-55d6-4e48-9b3d-1ca5f2cf703e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "bef9e18f-2284-4382-8672-c697d65a870e",
        name: "Agencia (125) Maracaibo 5 De Julio",
        subnet: "10.84.125.25"
    },
    {
        id: "c8791b49-2ab4-4638-8eed-725146c2c241",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "51445e96-7f6c-4b09-bf5e-afe47cc83c8c",
        name: "Agencia (126) Villa Del Rosario",
        subnet: "192.168.78.72"
    },
    {
        id: "1f9ac637-ccdd-42e1-a702-167b598d5ba3",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3a38955a-69f5-439b-bf10-82a07cd86625",
        name: "Agencia (127) Valencia Camoruco",
        subnet: null
    },
    {
        id: "a70c1db7-1c12-4544-b878-c777ac6f38be",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f0268ec2-0ac7-4d61-a469-9336b2426dca",
        name: "Agencia (128) Valencia Centro",
        subnet: null
    },
    {
        id: "5c5fcd96-c763-49d9-952c-ea46e8cf3583",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "53ba94be-83f0-4e85-8b9f-156d3188038d",
        name: "Agencia (129) Ciudad Bolívar II",
        subnet: null
    },
    {
        id: "afe5d1f1-9c94-4aed-b022-9099da815c8f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "54e5eb04-fcf0-4e2c-8bc6-ba212a8c7b2f",
        name: "Agencia (130) Club La Lagunita",
        subnet: null
    },
    {
        id: "151936ee-41d3-4a90-b023-96a46b3483d6",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a8d303f8-6774-40be-9fdb-8cad64f63ec7",
        name: "Agencia (133) Choroní",
        subnet: null
    },
    {
        id: "f4db6ceb-cede-40cf-8e22-1fb441070b12",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d859d34d-9b44-4b85-9594-500943339b15",
        name: "Agencia (135) Centro Medico Maracay",
        subnet: null
    },
    {
        id: "cec1a114-a5bd-4bf5-9bc7-40eaf4eae0dd",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "128f90ad-56d8-4bc9-b940-57885fc6e4f2",
        name: "Agencia (137) Zona Industrialii Barquisimeto",
        subnet: null
    },
    {
        id: "accd726a-d396-41d5-af53-23abf2846e70",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "5a9bf3b7-e2c5-48c9-aa78-50e01601bcb6",
        name: "Agencia (142) Los Dos Caminos",
        subnet: null
    },
    {
        id: "7e593e64-0bab-4e0b-ad02-87485709650e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c3ec984e-52b8-41e6-8434-a1815a5d29d7",
        name: "Agencia (144) La Victoria C.C. Palma Center",
        subnet: null
    },
    {
        id: "627dfad2-2f68-4527-8eb2-2768beb19bde",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "11fdac9b-b825-4530-b79e-ca8fabe324a7",
        name: "Agencia (146) Porlamar - Margarita",
        subnet: null
    },
    {
        id: "e6a6e57a-0123-4db0-874d-d55ef61c114f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f880f40f-dbcd-4309-b1ed-ae1e2adddde1",
        name: "Agencia (148) Las Garcitas Valencia",
        subnet: null
    },
    {
        id: "afce36da-078d-4b37-b4b4-52155f6757cd",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "6fd76a31-1e89-4c37-b966-cbbafdd2f33e",
        name: "Agencia (151) Maturin II",
        subnet: null
    },
    {
        id: "c7dd1652-2618-4aa3-941a-f9cc53005d1a",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "98fb7c68-d260-4f3f-a6aa-b01bde6f2220",
        name: "Agencia (152) C.C. Babilón Centro Sur",
        subnet: "192.168.79.197"
    },
    {
        id: "2355d92b-13be-429b-8f08-e75b8a71e74c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "26d9ce41-4723-425a-84a6-90230c5d63fe",
        name: "Agencia (153) La Trinidad Zona Industrial",
        subnet: null
    },
    {
        id: "69f1be76-478b-4950-b265-2f2c70464c2c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "411b6a1a-0184-439f-8906-6ab28e8f5828",
        name: "Agencia (153) Taquilla Centro Italo Venezolano",
        subnet: null
    },
    {
        id: "5e612afd-20f5-4726-9f82-7c5707c7a287",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "0b2d7618-77a4-400b-9782-35b2ed995f1e",
        name: "Agencia (155) Eurobuilding Puerto Ordaz",
        subnet: null
    },
    {
        id: "2e09b64b-599c-44e8-9dd4-ca39b1c8686c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "dcaacd36-4bc2-4070-86b5-4e763e81c5d4",
        name: "Agencia (156) Eurobuilding Barinas",
        subnet: null
    },
    {
        id: "ba5a236e-cc2d-4d0e-a4df-70ee6f79f320",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "fee0b3b3-b699-440e-91d7-3096dd92df57",
        name: "Agencia (159) Club Puerto Azul",
        subnet: null
    },
    {
        id: "4f6d90d6-50fa-4b57-bf48-8b8f4d5dbd6c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "907f1ce8-f759-4bf2-aa15-1cabf37720d7",
        name: "Agencia (161) Porlamar Centro",
        subnet: null
    },
    {
        id: "079e638a-c489-4ace-864b-902629090dc2",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9e56d085-b15b-4657-b3e5-86560fd7ae5d",
        name: "Agencia (162) Ciudad Ojeda",
        subnet: "10.100.162.13"
    },
    {
        id: "55bb3920-837f-433f-aa73-af57e0872924",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f2189c6d-a406-4e4f-bd7c-62f29fde72e0",
        name: "Agencia (163) Centro Comercial Los Teques",
        subnet: null
    },
    {
        id: "c4724d7b-0078-4f8f-b4b1-a2e6dca9ba1c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "37a45692-ff33-410a-9f9f-faac57e1f158",
        name: "Agencia (164) El Sombrero",
        subnet: null
    },
    {
        id: "88040a3a-e6d0-4e43-8829-5bf03c1e13a0",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ed3db184-0691-49ed-b62d-932daa08eeb0",
        name: "Agencia (165) Centro Comercial Metrópolis",
        subnet: null
    },
    {
        id: "f50da643-265b-450b-b3df-baec4d86e6ac",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ec6e6ccd-698e-49a9-9dbf-33b3dd29376c",
        name: "Agencia (166) Santa Mónica",
        subnet: null
    },
    {
        id: "6d3c13d1-5c0c-4586-9400-69018538f119",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "da2ad2f2-fe2a-4682-8e7e-a6a726397782",
        name: "Agencia (168) C.C. Metrópolis Valencia",
        subnet: null
    },
    {
        id: "fa346e12-35ec-4194-aae6-f7bb1b533b9f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "0979e30a-668a-4f4f-9bf8-a56588a75308",
        name: "Agencia (169) Traki Cabimas",
        subnet: null
    },
    {
        id: "d9696b0c-9505-4f8b-aed8-1bacf4ecfa7e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "966f96b2-e3ff-425d-8dc3-97fc37ddfdea",
        name: "Agencia (171) Guatire Av. Intercomunal",
        subnet: null
    },
    {
        id: "9ee1e1ad-f3af-49e7-b44d-fb0a1c4bcece",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d37a3466-2e44-4c10-9f07-3b43a9587395",
        name: "Agencia (172) El Tigrito",
        subnet: null
    },
    {
        id: "12b1feac-f4b6-4ace-931a-96f5f6f2076c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a8866282-718a-48f0-a507-f9ea6d104693",
        name: "Agencia (175) La Morita",
        subnet: null
    },
    {
        id: "5bd2b584-ece8-45bf-88eb-a0b98898fd03",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "1bf7e437-4fda-4fb1-a96d-278d0e4055c9",
        name: "Agencia (176) Lecheria",
        subnet: null
    },
    {
        id: "82e21c22-0281-4341-b43f-501fc25c63b2",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "00aead93-10f8-4cc5-a7ba-67ad45b3b6a2",
        name: "Agencia (178) Traki Cumaná",
        subnet: null
    },
    {
        id: "8dffde8e-7f95-4fb4-ae43-87e35eec6298",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c3fbd83e-dc33-4478-843c-7ed7c5451996",
        name: "Agencia (181) San Ignacio",
        subnet: null
    },
    {
        id: "ed0fbe38-647d-4e56-8f6e-fbed5f42ec96",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3edf91d9-fe9f-4e08-ac7e-a63a955e5446",
        name: "Agencia (184) La Candelaria Casa Italia",
        subnet: null
    },
    {
        id: "a32a2fc4-b3af-45e5-94ba-55c36cf4e05c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f0dde701-9934-4e85-af3f-be9df5303985",
        name: "Agencia (185) El Viñedo",
        subnet: null
    },
    {
        id: "6245a02a-0ed6-4323-bca9-83a8da221954",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "830959e2-84de-492f-a16e-20e745ab432c",
        name: "Agencia (192) Maracaibo III",
        subnet: "192.168.92.90"
    },
    {
        id: "1708270b-a443-4850-94b9-af60eaf0a9c1",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "34d5abbd-ad29-4310-9280-76f8db6a30fc",
        name: "Agencia (194) San Felipe",
        subnet: null
    },
    {
        id: "6a6e0fc4-a0e9-4d2f-b60a-3eb9d4266a95",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "fe3cf689-0692-4af3-86bf-c41ac3d50b22",
        name: "Agencia (196) Barinas",
        subnet: null
    },
    {
        id: "48f1eaee-b16c-438b-937f-f5d403c2395d",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "b8cbe77d-3718-406b-89bc-5f1ce3992d4e",
        name: "Agencia (197) Charallave C.C. Súper Líder",
        subnet: null
    },
    {
        id: "018e4e28-e3de-4129-94b3-0a84c54011e2",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "b61e21b7-f9de-4039-8477-943aa1fdde4a",
        name: "Agencia (199) Turmero C. C. Mariño Plaza",
        subnet: null
    },
    {
        id: "c31d1fde-9e20-419e-961a-cf8f986f7b75",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "cce92867-e8f6-49e9-9b37-d1b2dc9c643d",
        name: "Agencia (202) Yaritagua Hyper Líder",
        subnet: null
    },
    {
        id: "5e6a7684-31fd-41b0-8eb8-eec9f319724b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "eb9b35fd-18ff-4895-b7c9-03ccc4c2b754",
        name: "Agencia (203) San Diego Supermercado Híper Líder",
        subnet: null
    },
    {
        id: "48335550-09b3-4907-8c51-d74667bebd62",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d0c7cfd0-bcc8-443e-9924-01fe6aea41ec",
        name: "Agencia (206) San Fernando de Apure",
        subnet: null
    },
    {
        id: "e15e974a-4f5d-4615-96cf-b741a9b86d00",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "42a15fe3-ce7f-46f6-8070-2ed9232d62a6",
        name: "Agencia (207) Hiperlider Cabudare",
        subnet: null
    },
    {
        id: "75d53cad-a2ed-48c1-97df-7e665cd38841",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c10ecf1c-6a4d-4d67-b16d-c6119abab3d5",
        name: "Agencia (208) San Carlos",
        subnet: null
    },
    {
        id: "d86fc826-2dff-4fcf-bb6e-fde0cec2cc00",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "cff0093f-a2d5-43ed-aba5-9170d2a0cac2",
        name: "Agencia (209) Tucupita Traki",
        subnet: null
    },
    {
        id: "c14567db-b9d4-4409-8a05-2847f389f097",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7d7be8bb-34e8-4d4e-8faa-a2944ee6c8f9",
        name: "Agencia (210) Dabajuro II",
        subnet: "192.168.131.102"
    },
    {
        id: "a2e483ca-fcb1-4c0f-9c5d-64a7834f91a3",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "41183b3a-dad1-4c5e-89b3-9aa95b0edced",
        name: "Agencia (213) TRAKI San Fernando de Apure",
        subnet: null
    },
    {
        id: "693b0f53-82d6-45ed-bee7-854fa7247320",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9a63ff4d-3146-464a-9ee5-ba355d255c25",
        name: "Agencia (214) Centro Residencial Solano",
        subnet: null
    },
    {
        id: "6f2b5dad-66a6-4bf3-842d-894f994227ee",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "999e3071-7e60-494b-87e1-9f8319be40cd",
        name: "Agencia (215) Sambil Valencia",
        subnet: null
    },
    {
        id: "9687a51f-acc4-463a-a8b4-6706108a3527",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "151e0a4d-f651-40c5-8d9e-9ddbcad77ced",
        name: "Agencia (216) Excelsior Gama Santa Fe",
        subnet: null
    },
    {
        id: "909c5df5-7f45-4251-b588-7fcc702b5770",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "68750212-edb2-4ed0-b3d2-92bde06d8ad9",
        name: "Agencia (217) Excelsior Gama Santa Eduvigis",
        subnet: null
    },
    {
        id: "90ff7172-a235-409a-80c9-bdce591d2371",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "160297f8-d642-4619-bc9f-f38ebb3c27e1",
        name: "Agencia (218) C.C La Viña Valencia",
        subnet: null
    },
    {
        id: "4d0e3bb0-31e9-4914-8c8d-139bb8b785cd",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "816bdc29-ee4f-4fd3-9db0-9eb72e69d836",
        name: "Agencia (219) Hiper Lider Araure",
        subnet: null
    },
    {
        id: "6da3a6fc-d4ec-47cc-9d6b-cf1382ccd40e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "af6153d6-c6db-40a7-9bde-6f66295803a7",
        name: "Agencia (220) Boleita",
        subnet: null
    },
    {
        id: "356d5c9d-0978-42a8-b7cb-687a362d526b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "b2a62430-d447-4aaa-bbb5-982cd744dc15",
        name: "Agencia (221) Unicentro Maracay",
        subnet: null
    },
    {
        id: "ad136a8a-d6fc-43dd-93c9-ba2c9e846982",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7f0c9d4d-88f5-4885-a060-fd1ffd599fc0",
        name: "Agencia (230) Anaco Av. Mérida",
        subnet: null
    },
    {
        id: "abcc131e-13aa-41f6-a5f4-19b9302a20dd",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ad1c07f3-2d21-4bd4-8776-5fc098857cc8",
        name: "Agencia (231) Puerto PÍritu",
        subnet: null
    },
    {
        id: "9c33d076-daac-42e9-8cb9-d344a8a4d843",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7cf795fe-f984-43b3-8659-680fdb2707df",
        name: "Agencia (233) Barcelona Centro",
        subnet: null
    },
    {
        id: "2329d198-217b-42d3-9852-a5918d76494a",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a56d0119-fe6b-4ff7-b069-9b701e5e7e95",
        name: "Agencia (234) El Tigre",
        subnet: null
    },
    {
        id: "545207e2-42f1-4694-8d7e-dc18968a880f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f9a2c387-3d00-469d-9d54-1e4a364f7ce7",
        name: "Agencia (235) Lechería Centro Empresarial",
        subnet: null
    },
    {
        id: "7c5c0c55-4983-47e4-b9e1-2f0f1dbcef13",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "facaa3ce-2e01-44f2-89e6-77b209de02ea",
        name: "Agencia (236) San Fernando De Apure Intercomunal",
        subnet: null
    },
    {
        id: "2eb6b262-d107-447c-ac48-4a35bcc6f260",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "58841b15-1cb5-4797-8d97-cac0a04c3f11",
        name: "Agencia (237) Maracay Av. Aragua",
        subnet: null
    },
    {
        id: "ff3ae9b0-1a9e-4316-bbb7-c444d2f2d1f9",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4ec510c5-d8a2-489a-8350-2879936dc0be",
        name: "Agencia (238) Palo Negro Plaza Bolívar",
        subnet: null
    },
    {
        id: "9205bd7c-170a-4145-bd3a-8e745cca301d",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "b9c3c327-3250-42ef-9c8f-da3f597225ec",
        name: "Agencia (239) C.C. La Victoria",
        subnet: null
    },
    {
        id: "c09a2a32-5d0c-4da3-af14-2b032652f969",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7b19de9c-730f-4200-a106-b4fde87b4923",
        name: "Agencia (240) La Morita Intercomunal",
        subnet: null
    },
    {
        id: "2de1d767-fcdb-4698-97c9-82aacd791a12",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d6064e1b-a273-4b53-9bde-226ec44e95d4",
        name: "Agencia (241) Alto Barinas",
        subnet: null
    },
    {
        id: "5b622ff7-664d-4d34-9a1f-79e5146c71e1",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3da12550-5e66-4848-a56d-6a5a8a2c5c9d",
        name: "Agencia (242) Puerto Ordaz Castillito",
        subnet: null
    },
    {
        id: "f8fc54c5-98b8-46da-bd63-6ed1d16e067b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "fe9f1815-eed3-4260-b536-39c1446166a0",
        name: "Agencia (243) Guacara",
        subnet: null
    },
    {
        id: "c6c40a14-6198-4c9d-be99-d094f42176a2",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "797548b5-a308-4faa-bb86-e9de802118ad",
        name: "Agencia (244) Tocuyito",
        subnet: null
    },
    {
        id: "3d7e21a2-9106-4d38-8efe-33df6f1ae22e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3cd86847-58be-486b-957d-589229432b9c",
        name: "Agencia (245) Naguanagua Av. Universidad",
        subnet: null
    },
    {
        id: "89de27ef-9025-4a8d-9225-fb64be84d328",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9de0926c-d775-4150-b190-42926e97e73a",
        name: "Agencia (246) Montalbán",
        subnet: null
    },
    {
        id: "6791c946-21ee-46ef-9be9-d88b9061125e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "2434c7f4-6622-41ab-836e-e1766d5e94ff",
        name: "Agencia (247) Metroplaza",
        subnet: null
    },
    {
        id: "899b2073-ba4e-49bb-b78f-049888ecfce9",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d0d26d81-1d5f-493e-931e-aee7fb4b7d12",
        name: "Agencia (248) Santa Rosa",
        subnet: null
    },
    {
        id: "8891bc6e-8981-465e-947b-eb96c1998e1c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "543a621b-366e-426c-88a7-6afa87492ae2",
        name: "Agencia (249) San Jose De Tarbes",
        subnet: null
    },
    {
        id: "484aaaf6-5203-4582-b7a2-629527f93087",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9caf2634-d67a-4849-a690-764cc9b05ac2",
        name: "Agencia (251) Candelaria Valencia",
        subnet: null
    },
    {
        id: "72aa5a64-49e6-4a51-a8f3-eec915bee543",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "234860bf-68ed-41f7-9d17-a7b29952c6b7",
        name: "Agencia (252) Instituto Autonomo El Puerto",
        subnet: null
    },
    {
        id: "51b7cc53-399f-4875-b0bd-3465244cc3e8",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "71106c11-def6-4419-9783-c85e877b037c",
        name: "Agencia (253) Tinaquillo",
        subnet: null
    },
    {
        id: "11469eb7-4dbb-4764-9129-7835745881ab",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7d8a309d-07f6-4d26-a690-1e9fb6e056b4",
        name: "Agencia (254) Av.Universidad",
        subnet: null
    },
    {
        id: "c01d2408-e247-47d5-a7d7-69b6ee89350b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "9f7eb6bc-e564-4574-9f84-41527c7cd602",
        name: "Agencia (255) San Martin C.C. Los Molinos",
        subnet: null
    },
    {
        id: "ac0a448f-a348-4629-b109-7027922a0ea9",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "1f85b8ee-dcf7-413f-b104-1162282b56dd",
        name: "Agencia (256) Catia Av Sucre",
        subnet: null
    },
    {
        id: "f1caf1ec-de8c-42ee-900c-17ffd1ef52d4",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "03579c3d-5bc7-4906-855d-be655b0c6793",
        name: "Agencia (257) La Yaguara Av. Principal",
        subnet: null
    },
    {
        id: "3e31405a-e628-4100-af1d-4fb775bb57f5",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "86f27ff5-4591-45a5-918f-0f8f7a2c8e05",
        name: "Agencia (258) El Paraíso",
        subnet: null
    },
    {
        id: "fe033873-56ed-45b9-9a72-c84d3a5c9098",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c1083143-9a88-4ac7-91a5-73bfcd1f56dd",
        name: "Agencia (259) City Market",
        subnet: null
    },
    {
        id: "ab7b445e-f885-44c2-b257-d13ec543e4c3",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "e9105878-c452-4831-8b3c-10d56562bbda",
        name: "Agencia (260) Universidad Catolica Andres Bello",
        subnet: null
    },
    {
        id: "51ac252c-070a-427d-ac2c-a02fc0256d1d",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f6c684ca-5333-4aac-bb61-311a002d8665",
        name: "Agencia (261) Quinta Crespo",
        subnet: null
    },
    {
        id: "2c6f193e-3749-468f-b486-0b81d42dc312",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "83878811-a822-4898-93b9-f791c28e973f",
        name: "Agencia (262) Sambil Paraguaná",
        subnet: "10.36.9.14"
    },
    {
        id: "aa6c17e5-dce9-4e4d-8e01-616df9e3926f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "69f06f8d-58a9-4494-bdbd-0b9cb2437fc4",
        name: "Agencia (263) Punto Fijo Av Jacinto Lara",
        subnet: "10.36.1.52"
    },
    {
        id: "61e7612c-9d63-47fb-a862-88b461e0a50f",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "e4d19de7-22c3-4895-8324-345bd4c46d30",
        name: "Agencia (264) Barquisimeto Av. Vargas",
        subnet: null
    },
    {
        id: "f5b0abfa-5696-491d-9536-1d2bd71c24ec",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "be1a32e6-14f6-4658-b864-53260b2f0387",
        name: "Agencia (265) Sambil Barquisimeto",
        subnet: null
    },
    {
        id: "b229d7ca-0b1f-495f-aee1-310712923dab",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "16b4d06f-ec9d-4a3f-82c6-1a824f18412c",
        name: "Agencia (266) Barquisimeto Zona Industrial",
        subnet: null
    },
    {
        id: "8c06a060-2969-4c44-b294-49ae2e951002",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "78f45a10-3e99-48f1-99f6-7d2f6936f3bf",
        name: "Agencia (267) QuÍbor",
        subnet: null
    },
    {
        id: "fdf0aa46-a6a4-4b93-bf81-2fbe5d07a173",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "742a3faa-6075-4ab3-9bba-ee50a1b2a688",
        name: "Agencia (268) Carora",
        subnet: null
    },
    {
        id: "d19f7b55-724f-4263-8428-ae7c27287466",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d7f21c03-5d8b-49cd-83ca-23ed403e8998",
        name: "Agencia (269) Mérida Viaducto",
        subnet: "10.48.4.39"
    },
    {
        id: "7cfb9e9c-f2d9-47ea-b0e1-26ea2207dc20",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "8974dae5-0516-439a-865d-a46777785587",
        name: "Agencia (270) Paseo Las Mercedes",
        subnet: null
    },
    {
        id: "316c0c6a-88f3-4d16-9e6a-a0abe393cc77",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4cc9c471-d016-4b60-b12d-38a582f0779a",
        name: "Agencia (271) Cumbres De Curumo",
        subnet: null
    },
    {
        id: "e22e9943-e2b3-4347-9795-68fba44beb85",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "92108b77-9cf0-437e-9b99-192109a9fafa",
        name: "Agencia (272) C.C. La Cascada",
        subnet: null
    },
    {
        id: "720189b6-13ef-4368-8c3a-0930a9de8786",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "1e37dc9c-0a4b-4ea0-a74d-516741910914",
        name: "Agencia (273) Sambil Caracas",
        subnet: null
    },
    {
        id: "979cda22-394b-411b-b902-567dc9a13b11",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4b314099-24ae-47ae-bc35-a186471d5948",
        name: "Agencia (274) Los Cortijos",
        subnet: null
    },
    {
        id: "db43b971-2ea0-486b-b416-57a67ac915a6",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "61ea94b6-1317-4861-b850-f4de55e023ce",
        name: "Agencia (275) Guarenas C.C. Miranda",
        subnet: null
    },
    {
        id: "9c8df4a6-6c08-4e4c-8fff-add769627760",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a020e77d-3460-45f4-af16-9b22ca501620",
        name: "Agencia (276) El Marques",
        subnet: null
    },
    {
        id: "534c38d0-79b2-4e99-962c-4d35778cd6fd",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "6b6b64c4-b815-4f58-8e53-5f864bbb665e",
        name: "Agencia (277) Macaracuay",
        subnet: null
    },
    {
        id: "3e41d913-1d2e-4c82-b655-fed37fd73495",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "2e247218-1cea-496f-8a48-0106fbb24879",
        name: "Agencia (279) Guatire CC Buenaventura",
        subnet: null
    },
    {
        id: "fa9cdd6c-ccf3-45ff-8aa3-f7eaf6230da9",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4c48912f-8367-4a6f-b9c7-d9c36426e4b6",
        name: "Agencia (280) Centro Comercial Parque Costa Azul",
        subnet: null
    },
    {
        id: "2d9eb8dc-13e9-4b65-9d66-5e4a92e1c73c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c8cf9594-e829-4c47-a4b8-7db719c1b0bf",
        name: "Agencia (281) Sambil Margarita",
        subnet: null
    },
    {
        id: "9ddf2b9a-5feb-431d-a872-927f2427a057",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "27cc94eb-146f-4d7e-b208-7d6783629966",
        name: "Agencia (282) Juan Griego",
        subnet: null
    },
    {
        id: "c40280e5-8bee-48a7-9679-650013498b75",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "5a034792-33b9-4f18-a47b-fa2ae64fffb0",
        name: "Agencia (283) Guanare",
        subnet: null
    },
    {
        id: "07b7aaa8-cf19-4bcb-b749-883500428c15",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "1bd1efc9-b871-4911-8e84-7fc514bc4614",
        name: "Agencia (284) Turen",
        subnet: null
    },
    {
        id: "eae25178-1fbd-42be-bb11-6c35e369d7bc",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "e3d63904-fa04-477d-9a8f-d2d8cb80b903",
        name: "Agencia (285) Cumana",
        subnet: null
    },
    {
        id: "d567e974-5be3-452d-8104-dc6078e26d39",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "86989845-1305-4f2a-b5a9-20759cc48fe4",
        name: "Agencia (286) Sambil San Cristobal",
        subnet: "10.72.4.16"
    },
    {
        id: "fe6a5d35-f431-40b0-905a-bb422a41e370",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "194eabf9-5fac-4371-90a1-d212aa313efc",
        name: "Agencia (287) San Cristobal 7ma. Avenida",
        subnet: "10.72.3.51"
    },
    {
        id: "7eebb9e2-6f5f-4744-a9b7-3625d1121196",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "242de7bc-301a-4fac-9496-c3dc5ad6dbe6",
        name: "Agencia (288) Bocono",
        subnet: "10.76.7.31"
    },
    {
        id: "b50c1cb3-4a26-4f72-986b-ae22c5d1a042",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "84488b2b-5310-482f-84b7-50c9e832c361",
        name: "Agencia (289) Carvajal",
        subnet: null
    },
    {
        id: "c67bcf4a-5c12-4339-857e-8a358d6ca02e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "635e91ce-b2e8-4767-9d8b-6e62ef36611d",
        name: "Agencia (290) Sabana De Mendoza",
        subnet: "10.76.6.22"
    },
    {
        id: "17a5bd23-f9bc-41e5-8d5b-edf772bc0792",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d323b2d7-c66b-4f60-a7b6-bd0b80e747b2",
        name: "Agencia (291) Trujillo",
        subnet: "10.76.5.27"
    },
    {
        id: "55cfb700-95fd-4a10-8269-a73a71f795be",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "0b7c277c-decf-4fc6-9840-99e44f763552",
        name: "Agencia (292) Valera La Plata",
        subnet: "10.50.39.17"
    },
    {
        id: "c9a5a9f1-a96d-45cf-a512-d30dd7f37b4a",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d46a7824-510f-4520-8d2e-ca76b41abdd3",
        name: "Agencia (293) Valera La Puerta",
        subnet: "10.76.4.52"
    },
    {
        id: "296f9e25-968d-4c0b-a047-73c8a0bee36c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "914893d0-dc4b-454a-bf71-1765044cda3a",
        name: "Agencia (294) Catia La Mar",
        subnet: null
    },
    {
        id: "8f3083fa-bd70-4f65-8ec4-b62c899267a4",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "979eeccb-0394-4dc6-a6dd-101181e6e3d4",
        name: "Agencia (295) El Junquito",
        subnet: null
    },
    {
        id: "b217d994-b30a-4e79-9a1d-3f55eec70441",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "8a7df78b-5189-402e-894a-06df99598b19",
        name: "Agencia (296) Mene Grande",
        subnet: "10.84.26.16"
    },
    {
        id: "680db0a4-0d9f-4603-90b9-7855ca992356",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3464018a-af67-4275-86c6-3d59552b64e8",
        name: "Agencia (297) Cabimas Av. Independencia",
        subnet: "10.84.8.56"
    },
    {
        id: "15a53be7-c1c0-4dd0-81c3-818b83c44cb8",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c09ab640-fb98-40e6-8323-b3b81a31bd84",
        name: "Agencia (298) Santa Bárbara",
        subnet: "10.84.11.12"
    },
    {
        id: "fb49a47f-4afd-440d-957f-cc41cbb4df6a",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ef316625-a3da-4c60-8266-8252a42404d1",
        name: "Agencia (299) La Concepción",
        subnet: "10.84.32.21"
    },
    {
        id: "901f0004-c2c6-47bb-b6c0-5d8c19ee4d7b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "b06501ee-ab94-416c-9b9c-a3698f06ce13",
        name: "Agencia (300) Casigua",
        subnet: "10.84.30.38"
    },
    {
        id: "b9eeed92-ff5a-4c22-8e7e-ec8edb9e2592",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "b01667ba-d7c6-409c-ba20-2f060a53ba84",
        name: "Agencia (301) Machiques",
        subnet: null
    },
    {
        id: "5972e075-6e60-4bd4-aa30-0b5e822bf04e",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "942341a0-c13e-45d4-bdc4-9db42bfd28dc",
        name: "Agencia (302) Carrasquero",
        subnet: "10.84.86.53"
    },
    {
        id: "3a17fb38-8a1d-4d6d-8dd5-11a3e62d5289",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d6133f76-31b0-44b2-bed5-86ba3f644aaf",
        name: "Agencia (303) Maracaibo Norte",
        subnet: "10.50.4.15"
    },
    {
        id: "a5329285-d9c7-47b7-b824-95b1208c3f48",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "8c69473a-64fd-468d-ad4f-45a496feb236",
        name: "Agencia (304) Indio Mara",
        subnet: "10.50.43.51"
    },
    {
        id: "413b5d8f-0d08-4165-9b4f-6201f19e1b34",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "76b828a6-e6a5-4d54-9bd2-fbb70a96c276",
        name: "Agencia (305) Galerías Mall - Mcbo",
        subnet: "10.84.31.11"
    },
    {
        id: "462fa8c1-e37d-4654-8069-4fd7bf2e80c5",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "171e8689-c25b-46a2-88fb-225e74996c5d",
        name: "Agencia (306) Centro Lago Mall",
        subnet: "10.84.29.53"
    },
    {
        id: "35718ce5-290b-4616-b33a-0b22e171b872",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "0ec55716-b1e0-4d9f-a862-0524104c265d",
        name: "Agencia (307) Nautico",
        subnet: null
    },
    {
        id: "600b14ac-c255-4b65-81a1-65812d73d8d2",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "e64ee8cf-9ba5-4aac-b042-c02c1ff0996b",
        name: "Agencia (308) Curva De Molina",
        subnet: "10.103.8.16"
    },
    {
        id: "4e0248d4-187e-4e5a-94a9-df6dd88009c6",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4363b144-b7c2-4153-8e7e-f79c2d301f70",
        name: "Agencia (309) Sabaneta",
        subnet: "10.84.21.13"
    },
    {
        id: "e0f238cb-656e-4beb-bf58-34850628590a",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "1f046275-8974-4456-9255-69131e2253ad",
        name: "Agencia (311) Calle 72",
        subnet: "10.103.11.11"
    },
    {
        id: "e51410b4-f515-4205-a5c8-e233d03847bf",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "3c317a13-074b-40d5-b8ee-c80f622209fb",
        name: "Agencia (312) San Miguel",
        subnet: "10.84.25.31"
    },
    {
        id: "cb668df0-07f2-4298-a221-4028c1b0ef04",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "466397ac-e53b-4c1e-a0ea-ce90f06d478c",
        name: "Agencia (313) Maracaibo Zona Industrial",
        subnet: "10.103.13.16"
    },
    {
        id: "a4a77124-f7c4-4b66-8481-b35398d263e3",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "bc6f7dcb-54dc-48e7-8a2c-8bbadef6a82b",
        name: "Agencia (314) Las Mercedes",
        subnet: "10.84.7.52"
    },
    {
        id: "1dd0bd04-eb34-417c-b982-e983068a04fc",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "ec477984-62dc-4ca0-9cc9-335981099876",
        name: "Agencia (315) El Transito",
        subnet: "10.84.6.18"
    },
    {
        id: "52960dc4-a388-4c14-b859-9d897481020b",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "f63d6f5a-fba9-4f58-9070-47a855ca8bdb",
        name: "Agencia (316) Sambil Maracaibo",
        subnet: "10.103.16.11"
    },
    {
        id: "c3fe0065-6b65-4b27-9504-58ca94687273",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "b88d710d-885d-42a0-ad4b-bc1bf71e7dec",
        name: "Agencia (317) Puertos De Altagracia",
        subnet: "10.84.81.56"
    },
    {
        id: "3f5c82a3-84d2-4112-89e7-bd40ee02ce1c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "8783ba45-fab8-4bd0-9c05-9e384f66b48e",
        name: "Agencia (318) El Saman",
        subnet: "10.103.18.14"
    },
    {
        id: "699aa049-5e8d-4ef5-a589-7bd86ba6e506",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "8ad78ad8-b77b-4988-a1c2-60c0f4f81381",
        name: "Agencia (319) Mercamara",
        subnet: "10.84.62.53"
    },
    {
        id: "0fe79ea7-ed50-4710-b249-c722f815958c",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "c1f42684-74b1-497b-9fce-aeef8ac97e1a",
        name: "Agencia (321) Santa Rita",
        subnet: "10.84.104.13"
    },
    {
        id: "190197d1-da65-4162-8b85-ef9b4b33dbfe",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "49c2facc-1916-45c1-9c44-f82a439f338a",
        name: "Agencia (322) Caja Seca",
        subnet: "10.103.22.16"
    },
    {
        id: "e1ea5fb6-8179-4028-9d90-a565dbbf8c38",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "5f8337ab-1c1d-4d4a-85ed-926d1d505560",
        name: "Agencia (323) El Mojan",
        subnet: "10.84.92.52"
    },
    {
        id: "f9bd5d50-5995-4ba7-b46d-f49397f842ba",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a8302fd0-065e-4d11-8037-aae664ce8949",
        name: "Agencia (324) Av. Blandin Chacao",
        subnet: null
    },
    {
        id: "98981435-7f02-4c25-90e0-b649a61eebaf",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "d89ad8ca-49fe-401c-a5c1-76816dba2ccb",
        name: "Agencia (325) La Castellana",
        subnet: null
    },
    {
        id: "81c2e78e-e563-4235-bcf7-08f3079e3380",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "52efb8c5-9864-437d-9f9c-1ff5188d15d4",
        name: "Agencia (326) El Menito",
        subnet: "10.84.36.12"
    },
    {
        id: "bb553822-daae-4efd-ace4-a04ea7898daf",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "7219917a-f158-4c73-9d81-ac8936cca59c",
        name: "Agencia (327) Puerto De Maracaibo",
        subnet: "10.84.52.14"
    },
    {
        id: "6fe4c08a-f39e-41ac-8891-7d9173d9fe50",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "a44c4c0a-3356-4ca5-8894-95e1dd3f9722",
        name: "Agencia (328) Campo Alegre",
        subnet: null
    },
    {
        id: "9435208d-c2a1-41cb-b882-9fb737ba1c26",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "130fcc22-67bd-414a-aa36-7bca91e71bef",
        name: "Agencia (328) Taquilla Alcaldia Chacao",
        subnet: null
    },
    {
        id: "37e35a3f-fa36-4d2d-a6dc-a07f97ae87ff",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "eb779aca-bfb6-4879-b67b-c06ca3c25f15",
        name: "Agencia (534) Caucagua",
        subnet: null
    },
    {
        id: "77510947-ca06-421a-87d4-0b92c203ce72",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "eac2e623-74c7-4a5f-8ff1-2ed574fb1b45",
        name: "Agencia (535) Rio Chico",
        subnet: null
    },
    {
        id: "5aff875c-d4ac-45bd-a217-aa194e08a6bc",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "0f15df96-a244-4319-b9d1-2e05304fcf94",
        name: "Agencia (541) La Vela",
        subnet: null
    },
    {
        id: "a0d01efd-12ef-4022-bb24-236f4f227e18",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "4a2a3f4e-c1ac-4177-9cd8-2e4900b6f2c0",
        name: "Agencia (550) Santa Isabel",
        subnet: "10.76.3.23"
    },
    {
        id: "51d5ea95-5417-498b-bb9a-70af9a333237",
        typeOfSiteId: typeOfSite.filter(type => type.name === typeOfSiteOnlyName.AGENCIA)[0].id,
        siteId: "bed60787-5a8d-43e7-9236-959b4293ce16",
        name: "Agencia (552) Naiguata",
        subnet: null
    }
  ]



  module.exports = {siteMCBOlocation, agenciasSite, almacenes, siteName,almacenName, agenciaName}


