import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ProcessorPrimitives } from '../../domain/Processor'

export class ProcessorModel extends Model<ProcessorPrimitives> implements ProcessorPrimitives {
  readonly id!: string
  readonly name!: string
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
