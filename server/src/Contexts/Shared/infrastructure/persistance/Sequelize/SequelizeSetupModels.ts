import { type Sequelize } from 'sequelize'
import { initModelSeriesModel } from '../../../../ModelSeries/ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { initCategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'
import { initBrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { initDeviceModel } from '../../../../Device/Device/infrastructure/sequelize/DeviceSchema'
import { initUserModel } from '../../../../User/infrastructure/persistence/Sequelize/UserSchema'
import { initStatusModel } from '../../../../Device/Status/infrastructure/sequelize/StatusSchema'
import { initHardDriveCapacityModel } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/HardDriveCapacitySchema'
import { initHardDriveTypeModel } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/HardDriveTypeSchema'
import { initHardDriveModel } from '../../../../Features/HardDrive.ts/HardDrive/infraestructure/sequelize/HardDriveSchema'
import { initProcessorModel } from '../../../../Features/Processor/Processor/infrastructure/sequelize/ProcessorSchema'
import { initMemoryRamTypeModel } from '../../../../Features/MemoryRam/MemoryRamType/infraestructure/sequelize/MemoryRamTypeSchema'
import { initOperatingSystemModel } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/OperatingSystemSchema'
import { initOperatingSystemArqModel } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/OperatingSystemArqSchema'
import { initComputerModel } from '../../../../Features/Computer/infraestructure/sequelize/ComputerSchema'
import { initRolesodel } from '../../../../User/Role/infrastructure/sequelize/RolesSchema'
import { initHistoryModel } from '../../../../History/infrastructure/sequelize/HistorySchema'
import { initComputerModels } from '../../../../ModelSeries/ModelCharacteristics/Computers/Computer/infrastructure/sequelize/ComputerModelsSchema'
import { initLaptopModels } from '../../../../ModelSeries/ModelCharacteristics/Computers/Laptops/infraestructure/sequelize/LaptopsModelsSchema'
import { initProcessorSocketModel } from '../../../../Features/Processor/ProcessorSocket/infrastructure/sequelize/ProcessorSocketSchema'
import { initMonitorModels } from '../../../../ModelSeries/ModelCharacteristics/Monitors/infraestructure/MonitorModelSchema'
import { initModelPrinter } from '../../../../ModelSeries/ModelCharacteristics/Printers/Printers/insfraestructure/sequelize/ModelPrinterSchema'

export function setupModels (sequelize: Sequelize): void {
  initCategoryModel(sequelize)
  initBrandModel(sequelize)
  initModelSeriesModel(sequelize)
  initStatusModel(sequelize)
  initDeviceModel(sequelize)
  initRolesodel(sequelize)
  initUserModel(sequelize)
  initHardDriveCapacityModel(sequelize)
  initHardDriveTypeModel(sequelize)
  initHardDriveModel(sequelize)
  initProcessorModel(sequelize)
  initProcessorSocketModel(sequelize)
  initMemoryRamTypeModel(sequelize)
  initOperatingSystemModel(sequelize)
  initOperatingSystemArqModel(sequelize)
  initComputerModel(sequelize)
  initHistoryModel(sequelize)
  initComputerModels(sequelize)
  initLaptopModels(sequelize)
  initMonitorModels(sequelize)
  initModelPrinter(sequelize)
}
