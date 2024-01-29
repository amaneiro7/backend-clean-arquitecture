import { type Sequelize, DataTypes, Model } from 'sequelize'
import { type MemoryRamCapacityPrimitives } from '../../domain/MemoryRamCapacity'

export class MemoryRamCapacityModel extends Model<MemoryRamCapacityPrimitives> implements MemoryRamCapacityPrimitives {
  readonly id!: number
  readonly value!: number
}

export function initMemoryRamCapacityModel (sequelize: Sequelize): void {
  MemoryRamCapacityModel.init(
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
      modelName: 'MemoryRamCapacity',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
