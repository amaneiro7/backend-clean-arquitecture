import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ComputerPrimitives } from '../../domain/Computer'

export class ComputerModel extends Model<ComputerPrimitives> implements ComputerPrimitives {
  readonly id!: string
  readonly categoryId!: number
  readonly deviceId!: string
  readonly processorId!: string | null
  readonly memoryRamCapacity!: number
  readonly hardDriveCapacityId!: number | null
  readonly hardDriveTypeId!: number | null
  readonly operatingSystemId!: number | null
  readonly operatingSystemArqId!: number | null
  readonly macAddress!: string | null
  readonly ipAddress!: string | null
}

export function initComputerModel (sequelize: Sequelize): void {
  ComputerModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: {
            args: [[1]],
            msg: 'No pertenece a esta categoria'
          }
        }
      },
      deviceId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      processorId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      memoryRamCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hardDriveCapacityId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      hardDriveTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      operatingSystemId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'operating_system_version_id'
      },
      operatingSystemArqId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      macAddress: {
        type: DataTypes.MACADDR,
        allowNull: true,
        unique: true
      },
      ipAddress: {
        type: DataTypes.INET,
        allowNull: true,
        validate: {
          isIPv4: true
        }
      }
    },
    {
      modelName: 'Computer',
      underscored: true,
      timestamps: true,
      sequelize
    }
  )
}
