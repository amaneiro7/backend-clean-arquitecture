import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type HardDrivePrimitives } from '../../domain/HardDriveold'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class HardDriveModel extends Model<HardDrivePrimitives> implements HardDrivePrimitives {
  readonly id!: string
  readonly categoryId!: number
  readonly deviceId!: string
  readonly health!: number
  readonly hardDriveCapacityId!: number
  readonly hardDriveTypeId!: number

  public static associate (models: Models): void {
    this.belongsTo(models.HardDriveCapacity, { as: 'hardDriveCapacity' })
    this.belongsTo(models.HardDriveType, { as: 'hardDriveType' })
    this.belongsTo(models.Device, { as: 'device', foreignKey: 'device_id' })
  }
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
        type: DataTypes.UUID,
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
