import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type OperatingSystemPrimitives } from '../../domain/OperatingSystem'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class OperatingSystemModel extends Model<OperatingSystemPrimitives> implements OperatingSystemPrimitives {
  readonly id!: number
  readonly version!: string

  public static associate (models: Models): void {
    this.hasMany(models.Computer, { as: 'computer' }) // An operating system can have many computers
  }
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
