
const {brandsData, brandOnlyName } = require("../BrandData/brands")
const {categoryData, categoryOnlyNames} = require("../categoryData/categoryData")

const modelName = {
    '933': '933',
    '9227': '9227',
    '9417': '9417',
    N936SW: 'N936SW',
    S2021: 'S2021',
    S1933: 'S1933',
    L1851W: 'L1851W',
    V193: 'V193',
    LE1711: 'LE1711',
    L1710: 'L1710',
    D186WA: 'D186WA',
    L197WA: 'L197WA',
    L1711: 'L1711',
    L1718S: 'L1718S',
    L177WSB: 'L177WSB',
    W1943SE: 'W1943SE',
    S19A10N: 'S19A10N',
    S23B550: 'SyncMaster S23B550',
    '910N': '910N',
    E1920: 'E1920',
    '73NW': '73NW'
  }

const modelMonitor = [
    { 
        id: '41f8efa2-4f2c-4c37-af9e-89b837226b90', 
        name: 'N936SW', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.AOC)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'fddc4fa1-d858-486f-bc67-3d13d7916bdc', 
        name: 'S2021', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.COMPAQ)[0].id, 
        screenSize: 20, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'e8f9b7c3-235a-490e-86fc-47d1790d7269', 
        name: 'S1933', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'ba307a95-6471-4a96-849b-b2619d365ce2', 
        name: 'L1851W', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '6d8386d3-0157-4dbd-a277-d5d8747736aa', 
        name: 'V193', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id, 
        screenSize: 19, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'd60bb7d5-0e9a-49b6-99c3-2e4fd9d47edf', 
        name: 'LE1711', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '246b7822-3a1a-4e01-85da-ac15c5f1dbf1', 
        name: 'L1710', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '5b06266f-89d8-4bba-9cd8-77f7f70260bd', 
        name: '9417', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.IBM)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'bf5b0633-0150-4d48-ab00-8fe4324a6bbf', 
        name: 'D186WA', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.LENOVO)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '80ac0abe-1d7b-4d0b-b025-d24d6c556b8f', 
        name: 'L197WA', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.LENOVO)[0].id, 
        screenSize: 19, 
        hasDVI: true, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '1c972fc0-c2b3-4286-9eb4-f359a346ebf2', 
        name: '9227', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.LENOVO)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'e4f9ec71-c4ba-444e-9d5b-b4eb6f11dac1', 
        name: 'L1711', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.LENOVO)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '12b8a855-82fd-42ff-82d5-2275baad9b8d', 
        name: 'L1718S', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.LENOVO)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '70a8dc15-8e65-431c-8366-81fecf3144b1', 
        name: 'L177WSB', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.LG)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '7e31f965-dd8a-4e04-8a8c-053bfeba74a4', 
        name: 'W1943SE', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.LG)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '2f5fe84f-4550-4da6-ad14-db31ccd54ea6', 
        name: 'S19A10N', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.SAMSUNG)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'e6c078b1-c15a-4fc8-9c1b-d7fd1f93782d', 
        name: 'SyncMaster S23B550', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.SAMSUNG)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: true, 
        hasVGA: true 
    },
    { 
        id: '2a79ca84-4029-4f4b-a635-0cda81682315', 
        name: '910N', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.SAMSUNG)[0].id, 
        screenSize: 19, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: 'fa27fec3-d49b-484b-a751-c07b48387883', 
        name: 'E1920', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.SAMSUNG)[0].id, 
        screenSize: 19, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '2cd3b34d-a0a2-4fb5-8528-b5926cca2677', 
        name: '73NW', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.SAMSUNG)[0].id, 
        screenSize: 17, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
    { 
        id: '0e8cf793-3544-49e7-a13e-f91161226c45', 
        name: '933', 
        categoryId: categoryData.filter(cat => cat.name === categoryOnlyNames.MONITORES)[0].id, 
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.SAMSUNG)[0].id, 
        screenSize: 18.5, 
        hasDVI: false, 
        hasHDMI: false, 
        hasVGA: true 
    },
  ]
  
  module.exports = { modelMonitor, modelName }