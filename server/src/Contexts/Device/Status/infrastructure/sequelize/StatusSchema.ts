import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type StatusPrimitives } from '../../domain/Status'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class StatusModel extends Model<StatusPrimitives> implements StatusPrimitives {
  readonly id!: number
  readonly name!: string

  public static associate (models: Models): void {
    this.hasMany(models.Device, { as: 'devices' })
  }
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
