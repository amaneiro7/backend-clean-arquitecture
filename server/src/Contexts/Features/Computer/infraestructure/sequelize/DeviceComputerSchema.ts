import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type DeviceComputerPrimitives } from '../../domain/Computer'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type DeviceId } from '../../../../Device/Device/domain/DeviceId'
import { type ProcessorId } from '../../../Processor/Processor/domain/ProcessorId'
import { type MemoryRamCapacity } from '../../../MemoryRam/MemoryRamCapacity/MemoryRamCapacity'
import { type HardDriveCapacityId } from '../../../HardDrive.ts/HardDriveCapacity/domain/HardDriveCapacityId'
import { type HardDriveTypeId } from '../../../HardDrive.ts/HardDriveType/domain/HardDriveTypeId'
import { type OperatingSystemId } from '../../../OperatingSystem/OperatingSystem/domain/OperatingSystemId'
import { type OperatingSystemArqId } from '../../../OperatingSystem/OperatingSystemArq/domain/OperatingSystemArqID'
import { type MACAddress } from '../../domain/MACAddress'
import { type IPAddress } from '../../domain/IPAddress'

interface DeviceComputerCreationAttributes extends Omit<DeviceComputerPrimitives, 'serial' | 'activo' | 'statusId' | 'brandId' | 'modelId'> {
  deviceId: Primitives<DeviceId>
}
export class DeviceComputerModel extends Model<DeviceComputerCreationAttributes> implements DeviceComputerCreationAttributes {
  readonly deviceId!: string
  readonly id!: string
  readonly categoryId!: number
  readonly processorId!: Primitives<ProcessorId> | null
  readonly memoryRamCapacity!: Primitives<MemoryRamCapacity>
  readonly hardDriveCapacityId!: Primitives<HardDriveCapacityId> | null
  readonly hardDriveTypeId!: Primitives<HardDriveTypeId> | null
  readonly operatingSystemId!: Primitives<OperatingSystemId> | null
  readonly operatingSystemArqId!: Primitives<OperatingSystemArqId> | null
  readonly macAddress!: Primitives<MACAddress> | null
  readonly ipAddress!: Primitives<IPAddress> | null

  public static associate (models: Models): void {
    this.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' }) // A computer belongs to a category
    this.belongsTo(models.Device, { as: 'device', foreignKey: 'device_id' }) // A computer belongs to a device
    this.belongsTo(models.Processor, { as: 'processor', foreignKey: 'processorId' }) // A computer belongs to a processor
    this.belongsTo(models.HardDriveCapacity, { as: 'hardDriveCapacity', foreignKey: 'hardDriveCapacityId' }) // A computer belongs to a hard drive
    this.belongsTo(models.HardDriveType, { as: 'hardDriveType', foreignKey: 'hardDriveTypeId' }) // A computer belongs to a hard drive
    this.belongsTo(models.OperatingSystemVersion, { as: 'operatingSystem', foreignKey: 'operatingSystemId' }) // A computer belongs to an operating system
    this.belongsTo(models.OperatingSystemArq, { as: 'operatingSystemArq', foreignKey: 'operatingSystemArqId' }) // A computer belongs to an operating system arq
  }
}

export function initComputerModel (sequelize: Sequelize): void {
  DeviceComputerModel.init(
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
      modelName: 'DeviceComputer',
      underscored: true,
      timestamps: true,
      sequelize
    }
  )
}
