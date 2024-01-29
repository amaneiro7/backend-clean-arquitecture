import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type HardDrivePrimitives } from '../../domain/HardDrive'

export class HardDriveModel extends Model<HardDrivePrimitives> implements HardDrivePrimitives {
  readonly id!: string
  readonly categoryId!: number
  readonly deviceId!: string
  readonly health!: number
  readonly capacityId!: number
  readonly typeId!: number
}

export function initHardDriveModel (sequelize: Sequelize): void {
  HardDriveModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      health: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      capacityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      modelName: 'HardDrive',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
