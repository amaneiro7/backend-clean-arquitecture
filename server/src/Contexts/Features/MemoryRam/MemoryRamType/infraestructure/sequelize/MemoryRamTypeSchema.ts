import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type MemoryRamTypePrimitives } from '../../domain/MemoryRamType'

export class MemoryRamTypeModel extends Model<MemoryRamTypePrimitives> implements MemoryRamTypePrimitives {
  readonly id!: number
  readonly name!: string
}

export function initMemoryRamTypeModel (sequelize: Sequelize): void {
  MemoryRamTypeModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'MemoryRamType',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
