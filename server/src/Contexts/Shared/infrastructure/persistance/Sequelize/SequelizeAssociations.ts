import { BrandModel } from '../../../../Brand/infrastructure/Sequelize/BrandSchema'
import { CategoryModel } from '../../../../Category/infrastructure/Sequelize/CategorySchema'
import { DeviceModel } from '../../../../Device/Device/infrastructure/sequelize/DeviceSchema'
import { StatusModel } from '../../../../Device/Status/infrastructure/sequelize/StatusSchema'
import { ComputerModel } from '../../../../Features/Computer/infraestructure/sequelize/ComputerSchema'
import { HardDriveModel } from '../../../../Features/HardDrive.ts/HardDrive/infraestructure/sequelize/HardDriveSchema'
import { HardDriveCapacityModel } from '../../../../Features/HardDrive.ts/HardDriveCapacity/infraestructure/sequelize/HardDriveCapacitySchema'
import { HardDriveTypeModel } from '../../../../Features/HardDrive.ts/HardDriveType/infraestructure/sequelize/HardDriveTypeSchema'
import { OperatingSystemModel } from '../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/OperatingSystemSchema'
import { OperatingSystemArqModel } from '../../../../Features/OperatingSystem/OperatingSystemArq/infraestructure/sequelize/OperatingSystemArqSchema'
import { ProcessorModel } from '../../../../Features/Processor/Processor/infrastructure/sequelize/ProcessorSchema'
import { HistoryModel } from '../../../../History/infrastructure/sequelize/HistorySchema'

import { ModelSeriesModel } from '../../../../ModelSeries/ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'
import { RolesModel } from '../../../../User/Role/infrastructure/sequelize/RolesSchema'
import { UserModel } from '../../../../User/infrastructure/persistence/Sequelize/UserSchema'

// Define associations between different Sequelize models
export function InitSequelizeAssociation (): void {
  // Category Associations
  CategoryModel.hasMany(ModelSeriesModel, { as: 'model' }) // A category can have many model series
  CategoryModel.hasMany(HardDriveModel, { as: 'hardDrive' }) // A category can have many hard drive
  CategoryModel.hasMany(ComputerModel, { as: 'computer' }) // A category can have many computer

  // Brand Associations
  BrandModel.hasMany(ModelSeriesModel, { as: 'model' }) // A brand can have many model series

  // Model Associations
  ModelSeriesModel.belongsTo(CategoryModel, { as: 'category' }) // A model series belongs to a category
  ModelSeriesModel.belongsTo(BrandModel, { as: 'brand' }) // A model series belongs to a brand
  ModelSeriesModel.hasMany(DeviceModel, { as: 'device' }) // A model series can have many devices

  // Status Associations
  StatusModel.hasMany(DeviceModel, { as: 'device' }) // A status can have many devices

  // Device Associations
  DeviceModel.belongsTo(ModelSeriesModel, { as: 'model' }) // A device belongs to a model series
  DeviceModel.belongsTo(StatusModel, { as: 'status' }) // A device belongs to a status
  DeviceModel.hasOne(HardDriveModel, { as: 'hardDrive', foreignKey: 'device_id' }) // A device has one hard drive
  DeviceModel.hasOne(ComputerModel, { as: 'computer', foreignKey: 'device_id' }) // A device has one computer
  // HardDrive Associations
  HardDriveCapacityModel.hasMany(HardDriveModel, { as: 'hardDrive' }) // A hard drive capacity can have many hard drives
  HardDriveCapacityModel.hasMany(ComputerModel, { as: 'computer' }) // A hard drive capacity can have many computers
  HardDriveTypeModel.hasMany(HardDriveModel, { as: 'hardDrive' }) // A hard drive type can have many hard drives
  HardDriveTypeModel.hasMany(ComputerModel, { as: 'computer' }) // A hard drive type can have many computers
  HardDriveModel.belongsTo(HardDriveCapacityModel, { as: 'hardDriveCapacity' }) // A hard drive belongs to a hard drive capacity
  HardDriveModel.belongsTo(HardDriveTypeModel, { as: 'hardDriveType' }) // A hard drive belongs to a hard drive type
  HardDriveModel.belongsTo(DeviceModel, { as: 'device', foreignKey: 'device_id' }) // A hard drive belongs to a device

  // Processor Associations
  ProcessorModel.hasMany(ComputerModel, { as: 'computer' }) // A processor can have many computers

  // Operating System Associations
  OperatingSystemModel.hasMany(ComputerModel, { as: 'device' }) // An operating system can have many devices
  OperatingSystemArqModel.hasMany(ComputerModel, { as: 'device' }) // An operating system arq can have many devices

  // Computer Associations
  ComputerModel.belongsTo(CategoryModel, { as: 'category' }) // A computer belongs to a category
  ComputerModel.belongsTo(DeviceModel, { as: 'device', foreignKey: 'device_id' }) // A computer belongs to a device
  ComputerModel.belongsTo(ProcessorModel, { as: 'processor' }) // A computer belongs to a processor
  ComputerModel.belongsTo(HardDriveCapacityModel, { as: 'hardDriveCapacity' }) // A computer belongs to a hard drive
  ComputerModel.belongsTo(HardDriveTypeModel, { as: 'hardDriveType' }) // A computer belongs to a hard drive
  ComputerModel.belongsTo(OperatingSystemModel, { as: 'operatingSystem' }) // A computer belongs to an operating system
  ComputerModel.belongsTo(OperatingSystemArqModel, { as: 'operatingSystemArq' }) // A computer belongs to an operating system arq

  // Role Associations
  RolesModel.hasMany(UserModel, { as: 'user' }) // A role can have many users or all

  // User Associations
  UserModel.belongsTo(RolesModel, { as: 'role' }) // A user belongs to a role
  UserModel.hasMany(HistoryModel, { as: 'history' }) // A user can have many history

  // History Associations
  HistoryModel.belongsTo(UserModel, { as: 'user' }) // a history belongs to a user
}
