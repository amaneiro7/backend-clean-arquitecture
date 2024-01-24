import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type ComputerProcessorPrimitives } from '../../domain/ProcessorFeatures/ComputerProcessor'

export class ProcessorModel extends Model<ComputerProcessorPrimitives> implements ComputerProcessorPrimitives {
  readonly id!: string
  readonly name!: string
}

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
    tableName: 'processors',
    modelName: 'Processor',
    timestamps: true,
    sequelize
  }
)
