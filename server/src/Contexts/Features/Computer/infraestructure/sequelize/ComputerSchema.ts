import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ComputerPrimitives } from '../../domain/Computer.old'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

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

  public static associate (models: Models): void {
    this.belongsTo(models.Category, { as: 'category' }) // A computer belongs to a category
    this.belongsTo(models.Device, { as: 'device', foreignKey: 'device_id' }) // A computer belongs to a device
    this.belongsTo(models.Processor, { as: 'processor' }) // A computer belongs to a processor
    this.belongsTo(models.HardDriveCapacity, { as: 'hardDriveCapacity' }) // A computer belongs to a hard drive
    this.belongsTo(models.HardDriveType, { as: 'hardDriveType' }) // A computer belongs to a hard drive
    this.belongsTo(models.OperatingSystemVersion, { as: 'operatingSystem' }) // A computer belongs to an operating system
    this.belongsTo(models.OperatingSystemArq, { as: 'operatingSystemArq' }) // A computer belongs to an operating system arq
  }
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
            args: [[1, 2, 3, 4]],
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
