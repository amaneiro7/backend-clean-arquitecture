import { type Sequelize, DataTypes, Model } from 'sequelize'
import { type HardDriveCapacityPrimitives } from '../../domain/HardDriveCapacity'

export class HardDriveCapacityModel extends Model<HardDriveCapacityPrimitives> implements HardDriveCapacityPrimitives {
  readonly id!: number
  readonly value!: number
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
      modelName: 'HardDriveType',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
