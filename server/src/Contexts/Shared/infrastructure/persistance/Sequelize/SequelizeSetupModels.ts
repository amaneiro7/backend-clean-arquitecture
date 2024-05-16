import { type Sequelize } from 'sequelize'
import { initModelSeriesModel } from '../../../../ModelSeries/ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { initCategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'
import { initBrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { initDeviceModel } from '../../../../Device/Device/infrastructure/sequelize/DeviceSchema'
import { initUserModel } from '../../../../User/user/infrastructure/persistance/Sequelize/UserSchema'
import { initStatusModel } from '../../../../Device/Status/infrastructure/sequelize/StatusSchema'
import { initHardDriveCapacityModel } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/HardDriveCapacitySchema'
import { initHardDriveTypeModel } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/HardDriveTypeSchema'
import { initProcessorModel } from '../../../../Features/Processor/Processor/infrastructure/sequelize/ProcessorSchema'
import { initMemoryRamTypeModel } from '../../../../Features/MemoryRam/MemoryRamType/infraestructure/sequelize/MemoryRamTypeSchema'
import { initOperatingSystemModel } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/OperatingSystemSchema'
import { initOperatingSystemArqModel } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/OperatingSystemArqSchema'
import { initRolesodel } from '../../../../User/Role/infrastructure/sequelize/RolesSchema'
import { initHistoryModel } from '../../../../History/infrastructure/sequelize/HistorySchema'
import { initComputerModels } from '../../../../ModelSeries/ModelCharacteristics/Computers/Computer/infrastructure/sequelize/ComputerModelsSchema'
import { initLaptopModels } from '../../../../ModelSeries/ModelCharacteristics/Computers/Laptops/infraestructure/sequelize/LaptopsModelsSchema'
import { initProcessorSocketModel } from '../../../../Features/Processor/ProcessorSocket/infrastructure/sequelize/ProcessorSocketSchema'
import { initMonitorModels } from '../../../../ModelSeries/ModelCharacteristics/Monitors/infraestructure/MonitorModelSchema'
import { initModelPrinter } from '../../../../ModelSeries/ModelCharacteristics/Printers/infraestructure/sequelize/ModelPrinterSchema'
import { initStateModel } from '../../../../Location/State/infrastructure/sequelize/StateSchema'
import { initCityModel } from '../../../../Location/City/infrastructure/sequelize/CitySchema'
import { initTypeOfSiteModel } from '../../../../Location/TypeOfSite/infrastructure/sequelize/TypeOfSiteSchema'
import { initRegionModel } from '../../../../Location/Region/infrastrcuture/sequelize/RegionSchema'
import { initSiteModel } from '../../../../Location/Site/infrastructure/sequelize/SiteSchema'
import { initLocationModel } from '../../../../Location/Location/infrastructure/sequelize/LocationSchema'
import { initVicepresidenciaEjecutivaModel } from '../../../../employee/Area/VicepresidenciaEjecutiva/infrastructure/sequelize/VicepresidenciaEjecutivaSchema'
import { initGerenciaModel } from '../../../../employee/Area/Gerencia/infrastructure/sequelize/GerenciaSchema'
import { initCoordinacionModel } from '../../../../employee/Area/Coordinacion/infrastructure/sequelize/CoordinacionSchema'
import { initVicepresidenciaModel } from '../../../../employee/Area/VicePresidencia/infrastructure/sequelize/VicepresidenciaSchema'
import { initCargoModel } from '../../../../employee/Cargo/infrastructure/sequelize/CargoSchema'
import { initDeviceHardDriveModel } from '../../../../Features/HardDrive.ts/HardDrive/infraestructure/sequelize/DeviceHardDriveSchema'
import { initDeviceComputerModel } from '../../../../Features/Computer/infraestructure/sequelize/DeviceComputerSchema'
import { initInputTypeModel } from '../../../../ModelSeries/InputType/infrastructure/sequelize/InputTypeSchema'
import { initKeyboardModels } from '../../../../ModelSeries/ModelCharacteristics/Keyboards/infraestructure/KeyboardModelSchema'
import { initEmployeeModel } from '../../../../employee/Employee/infrastructure/sequelize/EmployeeSchema'
import { initDeviceMFPModel } from '../../../../Features/MFP/infraestructure/MFPSchema'

export function setupModels (sequelize: Sequelize): void {
  initCategoryModel(sequelize)
  initBrandModel(sequelize)
  initModelSeriesModel(sequelize)
  initStatusModel(sequelize)
  initCargoModel(sequelize)
  initDeviceModel(sequelize)
  initDeviceHardDriveModel(sequelize)
  initRolesodel(sequelize)
  initUserModel(sequelize)
  initHardDriveCapacityModel(sequelize)
  initHardDriveTypeModel(sequelize)
  initProcessorModel(sequelize)
  initProcessorSocketModel(sequelize)
  initMemoryRamTypeModel(sequelize)
  initOperatingSystemModel(sequelize)
  initOperatingSystemArqModel(sequelize)
  initDeviceComputerModel(sequelize)
  initDeviceMFPModel(sequelize)
  initHistoryModel(sequelize)
  initComputerModels(sequelize)
  initLaptopModels(sequelize)
  initMonitorModels(sequelize)
  initModelPrinter(sequelize)
  initKeyboardModels(sequelize)
  initStateModel(sequelize)
  initCityModel(sequelize)
  initTypeOfSiteModel(sequelize)
  initRegionModel(sequelize)
  initSiteModel(sequelize)
  initLocationModel(sequelize)
  initVicepresidenciaEjecutivaModel(sequelize)
  initVicepresidenciaModel(sequelize)
  initGerenciaModel(sequelize)
  initCoordinacionModel(sequelize)
  initInputTypeModel(sequelize)
  initEmployeeModel(sequelize)
}
