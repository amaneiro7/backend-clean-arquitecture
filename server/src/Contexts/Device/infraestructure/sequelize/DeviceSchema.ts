import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type DevicePrimitives } from '../../domain/Device'
import { Status, type StatusTypes } from '../../domain/Status'

export class DeviceModel extends Model<DevicePrimitives> implements DevicePrimitives {
  readonly id!: string
  readonly serial!: string | null
  readonly activo!: string | null
  readonly status!: StatusTypes
  readonly modelId!: string
}

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
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: Status.toPrimitive()
    },
    modelId: {
      field: 'model_id',
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'modelSeries',
        key: 'id'
      }
    }
  },
  {
    tableName: 'devices',
    modelName: 'Device',
    timestamps: true,
    updatedAt: true,
    sequelize
  }
)
