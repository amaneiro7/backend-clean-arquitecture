import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type OperatingSystemArqPrimitives } from '../../domain/OperatingSystemArq'

export class OperatingSystemArqModel extends Model<OperatingSystemArqPrimitives> implements OperatingSystemArqPrimitives {
  readonly id!: number
  readonly name!: string
}

export function initOperatingSystemArqModel (sequelize: Sequelize): void {
  OperatingSystemArqModel.init(
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
      modelName: 'OperatingSystemArq',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
