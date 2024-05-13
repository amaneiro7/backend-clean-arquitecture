import { BrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { CategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'
import { DeviceModel } from '../../../../Device/Device/infrastructure/sequelize/DeviceSchema'
import { StatusModel } from '../../../../Device/Status/infrastructure/sequelize/StatusSchema'
import { DeviceComputerModel } from '../../../../Features/Computer/infraestructure/sequelize/DeviceComputerSchema'
import { DeviceHardDriveModel } from '../../../../Features/HardDrive.ts/HardDrive/infraestructure/sequelize/DeviceHardDriveSchema'
import { HardDriveCapacityModel } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/HardDriveCapacitySchema'
import { HardDriveTypeModel } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/HardDriveTypeSchema'
import { MemoryRamTypeModel } from '../../../../Features/MemoryRam/MemoryRamType/infraestructure/sequelize/MemoryRamTypeSchema'
import { OperatingSystemModel } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/OperatingSystemSchema'
import { OperatingSystemArqModel } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/OperatingSystemArqSchema'
import { ProcessorModel } from '../../../../Features/Processor/Processor/infrastructure/sequelize/ProcessorSchema'
import { ProcessorSocketModel } from '../../../../Features/Processor/ProcessorSocket/infrastructure/sequelize/ProcessorSocketSchema'
import { HistoryModel } from '../../../../History/infrastructure/sequelize/HistorySchema'
import { CityModel } from '../../../../Location/City/infrastructure/sequelize/CitySchema'
import { LocationModel } from '../../../../Location/Location/infrastructure/sequelize/LocationSchema'
import { RegionModel } from '../../../../Location/Region/infrastrcuture/sequelize/RegionSchema'
import { SiteModels } from '../../../../Location/Site/infrastructure/sequelize/SiteSchema'
import { StateModel } from '../../../../Location/State/infrastructure/sequelize/StateSchema'
import { TypeOfSiteModel } from '../../../../Location/TypeOfSite/infrastructure/sequelize/TypeOfSiteSchema'
import { InputTypeModel } from '../../../../ModelSeries/InputType/infrastructure/sequelize/InputTypeSchema'
import { ComputerModelsModel } from '../../../../ModelSeries/ModelCharacteristics/Computers/Computer/infrastructure/sequelize/ComputerModelsSchema'
import { LaptopModelsModel } from '../../../../ModelSeries/ModelCharacteristics/Computers/Laptops/infraestructure/sequelize/LaptopsModelsSchema'
import { KeyboardModelsModel } from '../../../../ModelSeries/ModelCharacteristics/Keyboards/infraestructure/KeyboardModelSchema'
import { MonitorModelsModel } from '../../../../ModelSeries/ModelCharacteristics/Monitors/infraestructure/MonitorModelSchema'
import { ModelPrinterModel } from '../../../../ModelSeries/ModelCharacteristics/Printers/infraestructure/sequelize/ModelPrinterSchema'
import { ModelSeriesModel } from '../../../../ModelSeries/ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { RolesModel } from '../../../../User/Role/infrastructure/sequelize/RolesSchema'
import { UserModel } from '../../../../User/user/infrastructure/persistance/Sequelize/UserSchema'
import { CoordinacionModel } from '../../../../employee/Area/Coordinacion/infrastructure/sequelize/CoordinacionSchema'
import { GerenciaModel } from '../../../../employee/Area/Gerencia/infrastructure/sequelize/GerenciaSchema'
import { VicepresidenciaModel } from '../../../../employee/Area/VicePresidencia/infrastructure/sequelize/VicepresidenciaSchema'
import { VicepresidenciaEjecutivaModel } from '../../../../employee/Area/VicepresidenciaEjecutiva/infrastructure/sequelize/VicepresidenciaEjecutivaSchema'
import { CargoModel } from '../../../../employee/Cargo/infrastructure/sequelize/CargoSchema'
import { EmployeeModel } from '../../../../employee/Employee/infrastructure/sequelize/EmployeeSchema'
import { sequelize } from './SequelizeConfig'
import { type Models } from './SequelizeRepository'

// Define associations between different Sequelize models
export function InitSequelizeAssociation (): void {
  const models = sequelize.models as unknown as Models
  CategoryModel.associate(models) // Category Associations
  BrandModel.associate(models) // Brand Associations
  ModelSeriesModel.associate(models) // Model Associations
  ComputerModelsModel.associate(models) // Computer Models Associations
  LaptopModelsModel.associate(models) // ModelLaptop Associations
  MonitorModelsModel.associate(models) // ModelMonitor Associations
  ModelPrinterModel.associate(models) // ModelPrinter Associations
  KeyboardModelsModel.associate(models) // ModelKeyboard Associations
  StatusModel.associate(models) // Status Associations
  DeviceModel.associate(models)// Device Associations
  DeviceComputerModel.associate(models) // DeviceComputer Associations
  DeviceHardDriveModel.associate(models) // DeviceHardDrive Associations
  HardDriveCapacityModel.associate(models) // HardDriveCapacity Associations
  HardDriveTypeModel.associate(models) // HardDriveType Associations
  ProcessorModel.associate(models) // Processor Associations
  ProcessorSocketModel.associate(models) // ProcessorSocket Associations
  MemoryRamTypeModel.associate(models) // MemoryRamType Associations
  OperatingSystemModel.associate(models) // OperatingSystem Associations
  OperatingSystemArqModel.associate(models) // OperatingSystemArq Associations
  RolesModel.associate(models) // Role Associations
  UserModel.associate(models)// User Associations
  HistoryModel.associate(models)// History Associations
  StateModel.associate(models)// State Associations
  CityModel.associate(models) // City Associations
  TypeOfSiteModel.associate(models) // TypeOfSite Associations
  RegionModel.associate(models) // Region Associations
  SiteModels.associate(models) // Site Associations
  LocationModel.associate(models) // Location Associations
  VicepresidenciaEjecutivaModel.associate(models) // VicepresidenciaEjecutiva Associations
  VicepresidenciaModel.associate(models) // Vicepresidencia Associations
  GerenciaModel.associate(models) // Gerencia Associations
  CoordinacionModel.associate(models) // Coordinacion Associations
  CargoModel.associate(models) // Cargo Associations
  EmployeeModel.associate(models) // Employee Associations
  InputTypeModel.associate(models) // InputType Associations
}
