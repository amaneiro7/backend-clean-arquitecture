const { brandsData, brandOnlyName } = require("../brandData/brand")
const { categoryData, categoryOnlyNames } = require("../categoryData/categoryData")
const { brandsBamData, brandBAMOnlyName } = require("../brandData/brandBam")
const { categoryBAMData, categoryBamOnlyNames } = require("../categoryData/newCategories")
const { randomUUID } = require("node:crypto")

for (let index = 0; index < 41; index++) {
    console.log(randomUUID())
}

const modelBAMName = {
    HP4915: 'HighPrint 4915',
    'HP4915+': 'HighPrint 4915+',
    HP4915XE: 'HighPrint 4915xe',
    OLIVETTI: 'Olivetti PR2'
}

const modelBAM = [
    {
        id: '60166377-1edb-4a2e-8d95-8be5efadb5d9',
        name: 'USB TL-WN821N',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.ANTENAS)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.TPLINK)[0].id
    },
    {
        id: '3cddf3c0-d936-4e42-82e6-cf8c2a7d07b6',
        name: 'MW41NF',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.ALCATEL)[0].id
    },
    {
        id: 'b7370819-8db0-4aaf-bc99-c30287f19f22',
        name: 'D32',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.HAIER)[0].id
    },
    {
        id: '409d4076-7c43-404e-8ad5-902d8412f307',
        name: 'JMR451',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.JIO)[0].id
    },
    {
        id: '004acf6c-e8ce-4d3d-bec2-f06116d83394',
        name: 'MF180',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.TOTOLINK)[0].id
    },
    {
        id: '987ab66f-4918-4ccc-9838-a15a266b4343',
        name: 'MF181',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.TOTOLINK)[0].id
    },
    {
        id: 'b3c4564b-1adb-4b55-83a3-e244efb25b28',
        name: 'MF910',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.ZTE)[0].id
    },
    {
        id: '12d79a4e-17fc-4ec0-b672-4970893161dc',
        name: 'MF911',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.ZTE)[0].id
    },
    {
        id: 'ddb1574b-9921-4b23-901d-6cd3d7c670f2',
        name: 'MF920V ',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.ZTE)[0].id
    },
    {
        id: '4f190a07-8da2-48b3-8e2f-2c2f3801da9a',
        name: 'MF920VS',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.ZTE)[0].id
    },
    {
        id: '369d0e04-f3dd-4d90-9545-99697033c27d',
        name: 'R4',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.GELSI)[0].id
    },
    {
        id: '54d0c0b4-5d0a-420f-996a-2def24486f11',
        name: 'R4 ',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.BAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.GELSI)[0].id
    },
    {
        id: '340d979d-0091-423e-8bc4-09ea012c3a84',
        name: 'Cable USB',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.CABLEUSB)[0].id,
        brandId: brandsBamData.filter(category => category.name === brOnlyName.HP)[0].id
    },
    {
        id: 'aa55a545-57f9-49a9-8459-8038ef4ee9b5',
        name: 'FaceCam 321',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.WEBCAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.GENIUS)[0].id
    },
    {
        id: '213d274c-6cef-462b-807f-55810f66e230',
        name: 'FaceCam 1010',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.WEBCAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.GENIUS)[0].id
    },
    {
        id: '82b0f3f6-4d0b-4b8e-8e24-5fb8f739226f',
        name: 'DMC-LS70',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.CAMARAS)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.PANASONIC)[0].id
    },
    {
        id: 'aa6667fb-e819-47ad-9820-d270fdd00073',
        name: 'ST65',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.CAMARAS)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.SAMSUNG)[0].id
    },
    {
        id: '9e0dacd0-f6e2-446b-b1dc-73a2cf6cbc4a',
        name: 'SteadyShot DSC-W620',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.CAMARAS)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.SONY)[0].id
    },
    {
        id: '5cecc1ce-6e19-4a2f-8c50-2c158487ea72',
        name: 'Tandberg TTC8-03',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.WEBCAM)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.CISCO)[0].id
    },
    {
        id: 'd8ee07a5-14e5-42ae-b486-9eaf31802e8e',
        name: 'Air A1475',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.IPAD)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.APPLE)[0].id
    },
    {
        id: 'f778e7d6-5d6c-4084-ac2a-668dbc6715a7',
        name: 'USB Wireless 850',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.MICROSOFT)[0].id
    },
    {
        id: '3664ee0a-fb02-4db1-9554-63bcda44a22a',
        name: 'Teclado Numerico',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.TARGUS)[0].id
    },
    {
        id: 'f7cf4d21-387c-4242-8e36-10a152a20418',
        name: 'Redmi Note 10 Onyx Gray',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.XIAMI)[0].id
    },
    {
        id: '8b752cc1-3853-45e1-bdcf-8c3332772ee8',
        name: 'Asha 311',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.NOKIA)[0].id
    },
    {
        id: '6c259b27-4483-4e0b-a5be-c3e83defd33f',
        name: 'Iphone 11',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.APPLE)[0].id
    },
    {
        id: 'c2f23c59-d9ee-4a4b-b5b9-3c1e64aa4206',
        name: 'Iphone 6 A1524',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.APPLE)[0].id
    },
    {
        id: '91899f99-e6f4-4e92-9d9a-b3e29b12896f',
        name: 'SAMSUNG Galaxy J2',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.SAMSUNG)[0].id
    },
    {
        id: '38651b20-4a4f-4619-867a-4260ecb28e7a',
        name: 'V265',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.MOTOROLA)[0].id
    },
    {
        id: '15763271-77cc-4c58-b5a4-71da0fba2e38',
        name: 'WX306',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.MOTOROLA)[0].id
    },
    {
        id: '8485fa94-06c9-4b89-ac09-fc619251a0e5',
        name: 'Y220',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandBAMOnlyName.HUAWEI)[0].id
    },
    {
        id: 'fcc6ca72-da27-46d2-afc8-1f8ab04e0ecf',
        name: 'Iphone 6 A1525',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.APPLE)[0].id
    },
    {
        id: 'f628c0f7-7ee5-4f98-bd64-7d4dbe7bf321',
        name: 'Iphone 6 A1526',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.PHONE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.APPLE)[0].id
    },
    {
        id: '71264c07-f6ae-443c-8877-6f879d562966',
        name: '.CONVERTIDORVGAHDMI',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.CONVERTIDORVGAHDMI)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.LENOVO)[0].id
    },
    {
        id: '596aaf06-6812-4ad7-aa9e-c196a0ddb3fc',
        name: 'SP-i170',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.CORNETAS)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.GENIUS)[0].id
    },
    {
        id: 'faa708c2-cd7a-4870-b852-4d8ac8f83736',
        name: 'HSA-Q001PR',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.DOCKING)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.HP)[0].id
    },
    {
        id: '63bdcdd6-abaf-477e-afa0-ee6aa0670af6',
        name: 'DK1522',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.DOCKING)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.LENOVO)[0].id
    },
    {
        id: '336328bb-0f64-404d-b224-d39869182fb3',
        name: 'USB-C Dock G5',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.DOCKING)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.HP)[0].id
    },
    {
        id: '9d44c9fb-b823-4e9f-9b4f-827f10819922',
        name: 'Active Pen G2',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.LAPIZOPTICO)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.HP)[0].id
    },
    {
        id: 'f7346165-9b4c-47de-b823-35051d9cc98d',
        name: 'Y1215P',
        categoryId: categoryBAMData.filter(category => category.name === categoryBamOnlyNames.MIC)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.GENIUS)[0].id
    },
    {
        id: 'ca462150-2c61-468a-8f09-716e62461092',
        name: 'Elite',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.MOUSE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.HP)[0].id
    },
    {
        id: 'aa268ae5-8dc1-4d2b-87e4-0a4df986dad1',
        name: 'Wireless 900 Model 1737',
        categoryId: categoryBAMData.filter(category => category.name === categoryOnlyNames.MOUSE)[0].id,
        brandId: brandsBamData.filter(category => category.name === brandOnlyName.MICROSOFT)[0].id
    },
]

module.exports = { modelBAMName, modelBAM }