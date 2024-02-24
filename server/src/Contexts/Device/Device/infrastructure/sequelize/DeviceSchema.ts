import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type DevicePrimitives } from '../../domain/Device'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class DeviceModel extends Model<DevicePrimitives> implements DevicePrimitives {
  readonly id!: string
  readonly serial!: string | null
  readonly activo!: string | null
  readonly statusId!: number
  readonly modelId!: string

  public static associate (models: Models): void {
    this.belongsTo(models.Model, { as: 'model' }) // A device belongs to a model series
    this.belongsTo(models.Status, { as: 'status' }) // A device belongs to a status
    this.hasOne(models.HardDrive, { as: 'hardDrive', foreignKey: 'device_id' }) // A device has one hard drive
    this.hasOne(models.Computer, { as: 'computer', foreignKey: 'device_id' }) // A device has one computer
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
