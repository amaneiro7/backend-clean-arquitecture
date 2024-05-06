const {brandsData, brandOnlyName} = require("../brandData/brands")
const {categoryData, categoryOnlyNames} = require("../categoryData/categoryData")

const modelPrinterName = {
  HP4915: 'HighPrint 4915',
  'HP4915+': 'HighPrint 4915+',
  HP4915XE: 'HighPrint 4915xe',
  OLIVETTI: 'Olivetti PR2'
}

const modelPrinter = [
    { 
      id: '97306e00-0f7a-49d6-bc89-65b3944d15ad', 
      name: 'HighPrint 4915', 
      categoryId: categoryData.filter(category => category.name === categoryOnlyNames.IMPRESORASFINANCIERAS)[0].id, 
      brandId: brandsData.filter(category => category.name === brandOnlyName.WINCOR)[0].id
    },
    { 
      id: '162468dc-73a4-4e9c-9925-721392b245d2', 
      name: 'HighPrint 4915+', 
      categoryId: categoryData.filter(category => category.name === categoryOnlyNames.IMPRESORASFINANCIERAS)[0].id, 
      brandId: brandsData.filter(category => category.name === brandOnlyName.WINCOR)[0].id
    },
    { 
      id: '1739931e-7808-443e-a895-a74d4e65ac90', 
      name: 'HighPrint 4915xe', 
      categoryId: categoryData.filter(category => category.name === categoryOnlyNames.IMPRESORASFINANCIERAS)[0].id, 
      brandId: brandsData.filter(category => category.name === brandOnlyName.WINCOR)[0].id
    },
    { 
      id: '5ec89698-be12-4526-b7ad-dbdab5849e71', 
      name: 'Olivetti PR2', 
      categoryId: categoryData.filter(category => category.name === categoryOnlyNames.IMPRESORASFINANCIERAS)[0].id, 
      brandId: brandsData.filter(category => category.name === brandOnlyName.OLIVETTI)[0].id
    },
  ]

  module.exports = { modelPrinter, modelPrinterName }