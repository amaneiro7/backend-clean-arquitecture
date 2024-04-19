import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type DevicePrimitives } from '../../domain/Device'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type DeviceId } from '../../domain/DeviceId'
import { type DeviceSerial } from '../../domain/DeviceSerial'
import { type DeviceActivo } from '../../domain/DeviceActivo'
import { type StatusId } from '../../../Status/domain/StatusId'
import { type BrandId } from '../../../../Brand/domain/BrandId'
import { type ModelSeriesId } from '../../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type DeviceEmployee } from '../../domain/DeviceEmployee'
import { type DeviceObservation } from '../../domain/DeviceObservation'
import { type DeviceLocation } from '../../domain/DeviceLocation'

export class DeviceModel extends Model<DevicePrimitives> implements DevicePrimitives {
  readonly id!: Primitives<DeviceId>
  readonly serial!: Primitives<DeviceSerial>
  readonly activo!: Primitives<DeviceActivo>
  readonly statusId!: Primitives<StatusId>
  readonly categoryId!: Primitives<CategoryId>
  readonly brandId!: Primitives<BrandId>
  readonly modelId!: Primitives<ModelSeriesId>
  readonly employeeId!: Primitives<DeviceEmployee>
  readonly locationId!: Primitives<DeviceLocation>
  readonly observation!: Primitives<DeviceObservation>

  public static associate (models: Models): void {
    this.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' }) // A device belongs to a category
    this.belongsTo(models.Brand, { as: 'brand', foreignKey: 'brandId' }) // A device belongs to a brand
    this.belongsTo(models.Model, { as: 'model', foreignKey: 'modelId' }) // A device belongs to a model series
    this.belongsTo(models.Status, { as: 'status', foreignKey: 'statusId' }) // A device belongs to a status
    this.hasOne(models.DeviceHardDrive, { as: 'hardDrive', foreignKey: 'deviceId' }) // A device has one hard drive
    this.hasOne(models.DeviceComputer, { as: 'computer', foreignKey: 'deviceId' }) // A device has one computer
    this.belongsTo(models.Employee, { as: 'employee', foreignKey: 'employeeId' }) // A device belongs to an employee
    this.belongsTo(models.Location, { as: 'location', foreignKey: 'locationId' }) // A device belongs to a location
  }
}

export function initDeviceModel (sequelize: Sequelize): void {
  DeviceModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      activo: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
      },
      serial: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
      },
      statusId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      brandId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      modelId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      employeeId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      locationId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      observation: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      modelName: 'Device',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
