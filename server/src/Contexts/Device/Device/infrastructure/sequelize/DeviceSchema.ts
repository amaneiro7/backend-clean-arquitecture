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

export class DeviceModel extends Model<DevicePrimitives> implements DevicePrimitives {
  readonly id!: Primitives<DeviceId>
  readonly serial!: Primitives<DeviceSerial>
  readonly activo!: Primitives<DeviceActivo>
  readonly statusId!: Primitives<StatusId>
  readonly categoryId!: Primitives<CategoryId>
  readonly brandId!: Primitives<BrandId>
  readonly modelId!: Primitives<ModelSeriesId>

  public static associate (models: Models): void {
    this.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' }) // A device belongs to a category
    this.belongsTo(models.Brand, { as: 'brand', foreignKey: 'brandId' }) // A device belongs to a brand
    this.belongsTo(models.Model, { as: 'model', foreignKey: 'modelId' }) // A device belongs to a model series
    this.belongsTo(models.Status, { as: 'status', foreignKey: 'statusId' }) // A device belongs to a status
    this.hasOne(models.HardDrive, { as: 'hardDrive', foreignKey: 'deviceId' }) // A device has one hard drive
    this.hasOne(models.Computer, { as: 'computer', foreignKey: 'deviceId' }) // A device has one computer
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
        type: DataTypes.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brandId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      modelId: {
        type: DataTypes.UUID,
        allowNull: false
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
