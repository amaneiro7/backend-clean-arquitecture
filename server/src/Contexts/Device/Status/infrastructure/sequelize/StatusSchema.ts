import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type StatusPrimitives } from '../../domain/Status'

export class StatusModel extends Model<StatusPrimitives> implements StatusPrimitives {
  readonly id!: number
  readonly name!: string
}

export function initStatusModel (sequelize: Sequelize): void {
  StatusModel.init(
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
      modelName: 'Status',
      tableName: 'status',
      timestamps: false,
      underscored: true,
      sequelize
    }
  )
}
