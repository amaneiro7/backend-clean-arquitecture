import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type ComputerPrimitives } from '../../domain/Computer/ComputerFeatures'
import { ComputerType } from '../../domain/Computer/ComputerType'
import { MemoryRamSize } from '../../domain/MemoryRam/MemoryRamSize'
import { ComputerOSType } from '../../domain/Computer/ComputerOperatingSystem'
import { HardDriveCapacity } from '../../domain/HardDrive.ts/HardDriveCapacity'

export class ComputerFeaturesModel extends Model<ComputerPrimitives> implements ComputerPrimitives {
  readonly id!: string
  readonly computerType!: string
  readonly processorId!: string
  readonly memoryRam!: string
  readonly operatingSystem!: string
  readonly hardDriveCapacity!: string
}

ComputerFeaturesModel.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    computerType: {
      type: DataTypes.ENUM,
      values: ComputerType.toPrimitive(),
      allowNull: false
    },
    processorId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    memoryRam: {
      type: DataTypes.ENUM,
      values: MemoryRamSize.toPrimitive(),
      allowNull: false
    },
    operatingSystem: {
      type: DataTypes.ENUM,
      values: ComputerOSType.toPrimitive(),
      allowNull: false
    },
    hardDriveCapacity: {
      type: DataTypes.ENUM,
      values: HardDriveCapacity.toPrimitive(),
      allowNull: false
    }
  },
  {
    tableName: 'computer_features',
    modelName: 'Computer_Features',
    timestamps: true,
    sequelize
  }
)
