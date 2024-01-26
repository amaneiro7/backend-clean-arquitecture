import { DataTypes, type InitOptions, Model, type Sequelize, type ModelAttributes } from 'sequelize'
import { type DevicePrimitives } from '../../domain/Device'
import { Status, type StatusTypes } from '../../domain/Status'

export const DeviceSchema: ModelAttributes = {
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
  status: {
    allowNull: false,
    type: DataTypes.ENUM,
    values: Status.toPrimitive()
  }
}

export class DeviceModel extends Model<DevicePrimitives> implements DevicePrimitives {
  readonly id!: string
  readonly serial!: string | null
  readonly activo!: string | null
  readonly status!: StatusTypes
  readonly modelId!: string

  static config (sequelize: Sequelize): InitOptions {
    return {
      modelName: 'Device',
      timestamps: true,
      underscored: true,
      sequelize
    }
  }
}
