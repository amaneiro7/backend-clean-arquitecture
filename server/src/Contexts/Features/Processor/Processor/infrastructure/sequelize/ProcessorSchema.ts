import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ProcessorPrimitives } from '../../domain/Processor'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class ProcessorModel extends Model<ProcessorPrimitives> implements ProcessorPrimitives {
  readonly id!: string
  readonly name!: string

  public static associate (models: Models): void {
    this.hasMany(models.Computer, { as: 'computer' })
  }
}
export function initProcessorModel (sequelize: Sequelize): void {
  ProcessorModel.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      modelName: 'Processor',
      underscored: true,
      sequelize
    }
  )
}
