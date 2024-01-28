import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type DevicePrimitives } from '../../domain/Device'
import { Status, type StatusTypes } from '../../domain/Status'
import { ModelSeriesModel } from '../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'

class DeviceModel extends Model<DevicePrimitives> implements DevicePrimitives {
  readonly id!: string
  readonly serial!: string | null
  readonly activo!: string | null
  readonly status!: StatusTypes
  readonly modelId!: string
}

function initDeviceModel (sequelize: Sequelize): void {
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

DeviceModel.belongsTo(ModelSeriesModel)

export { DeviceModel, initDeviceModel }
