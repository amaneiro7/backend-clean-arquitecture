const { brandsData, brandOnlyName } = require("../BrandData/brands")
const { categoryData, categoryOnlyNames } = require("../categoryData/categoryData")
const {almacenes, almacenName} = require("../location/locations")
const { modelComputer, modelName } = require("../modelsSeries/modelComputer")
const { statusData, statusName } = require("../statusData/statusData")

const HP5700 = [
    {
        serial: 'MXJ713059Y',
        activo: null,
        statusId: statusData.filter(status => status.name === statusName.PORDESINCORPORAR)[0].id,
        categoryId: categoryData.filter(cate => cate.name === categoryOnlyNames.COMPUTADORAS)[0].id,
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id,
        modelId: modelComputer.filter(model => model.name === modelName.HPCOMPAQDC5700SMALLFORMFACTOR)[0].id,
        employeeId: null,
        locationId: almacenes.filter(location => location.name === almacenName.TORREBNC5DEJULIOALMACENPISO1)[0].id,
        observation: 'Obsoleto',
        computerName: null,
        processorId: "3ad56003-fb41-469a-b5e7-efa8df50a337",
        memoryRamCapacity: 0,
        hardDriveCapacityId: null,
        hardDriveTypeId: null,
        operatingSystemId: null,
        operatingSystemArqId: null,
        macAddress: null,
        ipAddress: null
    },
    {
        serial: 'MXJ72305TH',
        activo: 'AR001004090',
        statusId: statusData.filter(status => status.name === statusName.PORDESINCORPORAR)[0].id,
        categoryId: categoryData.filter(cate => cate.name === categoryOnlyNames.COMPUTADORAS)[0].id,
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id,
        modelId: modelComputer.filter(model => model.name === modelName.HPCOMPAQDC5700SMALLFORMFACTOR)[0].id,
        employeeId: null,
        locationId: almacenes.filter(location => location.name === almacenName.TORREBNC5DEJULIOALMACENPISO1)[0].id,
        observation: 'Obsoleto',
        computerName: null,
        processorId: "3ad56003-fb41-469a-b5e7-efa8df50a337",
        memoryRamCapacity: 0,
        hardDriveCapacityId: null,
        hardDriveTypeId: null,
        operatingSystemId: null,
        operatingSystemArqId: null,
        macAddress: null,
        ipAddress: null
    },
    {
        serial: 'MXJ64503MP',
        activo: 'AR001001790',
        statusId: statusData.filter(status => status.name === statusName.PORDESINCORPORAR)[0].id,
        categoryId: categoryData.filter(cate => cate.name === categoryOnlyNames.COMPUTADORAS)[0].id,
        brandId: brandsData.filter(brand => brand.name === brandOnlyName.HP)[0].id,
        modelId: modelComputer.filter(model => model.name === modelName.HPCOMPAQDC5700SMALLFORMFACTOR)[0].id,
        employeeId: null,
        locationId: almacenes.filter(location => location.name === almacenName.TORREBNC5DEJULIOALMACENPISO1)[0].id,
        observation: 'Obsoleto',
        computerName: null,
        processorId: "3ad56003-fb41-469a-b5e7-efa8df50a337",
        memoryRamCapacity: 0,
        hardDriveCapacityId: null,
        hardDriveTypeId: null,
        operatingSystemId: null,
        operatingSystemArqId: null,
        macAddress: null,
        ipAddress: null
    }
]




	
module.exports = { HP5700 }