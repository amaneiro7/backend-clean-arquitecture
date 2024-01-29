import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type OperatingSystemPrimitives } from '../../domain/OperatingSystem'

export class OperatingSystemModel extends Model<OperatingSystemPrimitives> implements OperatingSystemPrimitives {
  readonly id!: number
  readonly version!: string
}

export function initOperatingSystemModel (sequelize: Sequelize): void {
  OperatingSystemModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'OperatingSystemVersion',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
