import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type DeviceComputerPrimitives } from '../../domain/Computer'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type DeviceId } from '../../../../Device/Device/domain/DeviceId'
import { type ProcessorId } from '../../../Processor/Processor/domain/ProcessorId'
import { type MACAddress } from '../../domain/MACAddress'
import { type IPAddress } from '../../domain/IPAddress'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type ComputerName } from '../../domain/ComputerName'
import { CategoryValues } from '../../../../Category/domain/Category'
import { ComputerMemoryRamCapacity } from '../../domain/ComputerMemoryRamCapacity'
import { ComputerHardDriveCapacity } from '../../domain/ComputerHardDriveCapacity'
import { ComputerHardDriveType } from '../../domain/ComputerHardDriveType'
import { ComputerOperatingSystem } from '../../domain/ComputerOperatingSystem'
import { ComputerOperatingSystemArq } from '../../domain/ComputerOperatingSystemArq'
import { MemoryRamValues } from '../../../MemoryRam/MemoryRamCapacity/MemoryRamValues'

interface DeviceComputerCreationAttributes extends Pick<DeviceComputerPrimitives, 'id' | 'categoryId' | 'computerName' | 'processorId' | 'memoryRam' | 'memoryRamCapacity' | 'hardDriveCapacityId'
| 'hardDriveTypeId' | 'operatingSystemId' | 'operatingSystemArqId' | 'macAddress' | 'ipAddress' > {
  deviceId: Primitives<DeviceId>
}
export class DeviceComputerModel extends Model<DeviceComputerCreationAttributes> implements DeviceComputerCreationAttributes {
  readonly deviceId!: Primitives<DeviceId>
  readonly id!: Primitives<DeviceId>
  readonly categoryId!: Primitives<CategoryId>
  readonly computerName!: Primitives<ComputerName>
  readonly memoryRam! : Primitives<MemoryRamValues>[]
  readonly processorId!: Primitives<ProcessorId>
  readonly memoryRamCapacity!: Primitives<ComputerMemoryRamCapacity>
  readonly hardDriveCapacityId!: Primitives<ComputerHardDriveCapacity>
  readonly hardDriveTypeId!: Primitives<ComputerHardDriveType>
  readonly operatingSystemId!: Primitives<ComputerOperatingSystem>
  readonly operatingSystemArqId!: Primitives<ComputerOperatingSystemArq>
  readonly macAddress!: Primitives<MACAddress>
  readonly ipAddress!: Primitives<IPAddress>

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

export function initDeviceComputerModel (sequelize: Sequelize): void {
  DeviceComputerModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      categoryId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [[CategoryValues.COMPUTADORAS, CategoryValues.ALLINONE, CategoryValues.LAPTOPS, CategoryValues.SERVIDORES]],
            msg: 'No pertenece a esta categoria'
          }
        }
      },
      deviceId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      computerName: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
      },
      processorId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      memoryRam: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: true
      },
      memoryRamCapacity: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      hardDriveCapacityId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      hardDriveTypeId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      operatingSystemId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'operating_system_version_id'
      },
      operatingSystemArqId: {
        type: DataTypes.STRING,
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
