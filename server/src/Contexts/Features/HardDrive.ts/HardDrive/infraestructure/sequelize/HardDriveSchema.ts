import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type HardDrivePrimitives } from '../../domain/HardDrive'

export class HardDriveModel extends Model<HardDrivePrimitives> implements HardDrivePrimitives {
  readonly id!: string
  readonly categoryId!: number
  readonly deviceId!: string
  readonly health!: number
  readonly hardDriveCapacityId!: number
  readonly hardDriveTypeId!: number
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
        allowNull: false,
        validate: {
          isIn: {
            args: [[9]],
            msg: 'No pertenece a esta categoria'
          }
        }
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      health: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hardDriveCapacityId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hardDriveTypeId: {
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
