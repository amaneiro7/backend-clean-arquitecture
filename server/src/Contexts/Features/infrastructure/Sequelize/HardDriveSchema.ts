import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type HardDrivePrimitives } from '../../domain/HardDrive.ts/HardDrive'
import { HardDriveCapacityType } from '../../domain/HardDrive.ts/HardDriveCapacity'
import { HardDriveTypes } from '../../domain/HardDrive.ts/HardDriveType'

export class HardDriveModel extends Model<HardDrivePrimitives> implements HardDrivePrimitives {
  readonly id!: string
  readonly type!: HardDriveTypes
  readonly health!: number
  readonly capacity!: HardDriveCapacityType
}

HardDriveModel.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: Object.values(HardDriveTypes)
    },
    health: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    capacity: {
      type: DataTypes.ENUM,
      values: Object.values(HardDriveCapacityType),
      allowNull: false
    }
  },
  {
    tableName: 'hard_drives',
    modelName: 'HardDrive',
    timestamps: true,
    sequelize
  }
)
