import { type Sequelize, DataTypes, Model } from 'sequelize'
import { type HardDriveCapacityPrimitives } from '../../domain/HardDriveCapacity'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class HardDriveCapacityModel extends Model<HardDriveCapacityPrimitives> implements HardDriveCapacityPrimitives {
  readonly id!: number
  readonly value!: number

  public static associate (models: Models): void {
    this.hasMany(models.HardDrive, { as: 'hardDrive' })
    this.hasMany(models.Computer, { as: 'computer' })
  }
}

export function initHardDriveCapacityModel (sequelize: Sequelize): void {
  HardDriveCapacityModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'HardDriveCapacity',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
