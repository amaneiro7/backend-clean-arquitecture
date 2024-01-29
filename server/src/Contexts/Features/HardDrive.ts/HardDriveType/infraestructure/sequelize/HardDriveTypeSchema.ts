import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type HardDriveTypePrimitives } from '../../domain/HardDriveType'

export class HardDriveTypeModel extends Model<HardDriveTypePrimitives> implements HardDriveTypePrimitives {
  readonly id!: number
  readonly name!: string
}

export function initHardDriveTypeModel (sequelize: Sequelize): void {
  HardDriveTypeModel.init(
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
      modelName: 'HardDriveType',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
