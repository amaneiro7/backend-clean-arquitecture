import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ComputerPrimitives } from '../../domain/Computer'
import { type MemoryRamCapacityId } from '../../../MemoryRam/MemoryRamCapacity/domain/MemoryRamCapacityId'

export class ComputerModel extends Model<ComputerPrimitives> implements ComputerPrimitives {
  readonly id!: string
  readonly categoryId!: number
  readonly deviceId!: string
  readonly processorId!: string
  readonly memoryRam!: MemoryRamCapacityId[]
  readonly totalMemory!: number
  readonly hardDriveCapacityId!: number
  readonly hardDriveTypeId!: number
  readonly operatingSystemId!: number
  readonly operatingSystemArqId!: number
  readonly macAddress!: string
  readonly ipAddress!: string
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
        allowNull: false
      },
      memoryRam: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: []
      },
      totalMemory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      hardDriveCapacityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hardDriveTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      operatingSystemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'operating_system_version_id'
      },
      operatingSystemArqId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      macAddress: {
        type: DataTypes.MACADDR,
        allowNull: true,
        validate: {
          is: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
        }
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
