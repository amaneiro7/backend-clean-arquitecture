import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ProcessorPrimitives } from '../../domain/Processor'
import { type Models } from '../../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorId } from '../../domain/ProcessorId'
import { type ProcessorProductCollection } from '../../domain/ProcessorProductCollection'
import { type ProcessorNumberModel } from '../../domain/ProcessorNumberModel'
import { type ProcessorCores } from '../../domain/ProcessorCores'
import { type ProcessorHasThreads } from '../../domain/ProcessorIsThreads'
import { type ProcessorFrequency } from '../../domain/ProcessorFrequency'

export class ProcessorModel extends Model<ProcessorPrimitives> implements ProcessorPrimitives {
  readonly id!: Primitives<ProcessorId>
  readonly productCollection!: Primitives<ProcessorProductCollection>
  readonly numberModel!: Primitives<ProcessorNumberModel>
  readonly name!: string
  readonly cores!: Primitives<ProcessorCores>
  readonly threads!: Primitives<ProcessorHasThreads>
  readonly frequency!: Primitives<ProcessorFrequency>

  public static associate (models: Models): void {
    this.hasMany(models.DeviceComputer, { as: 'computer', foreignKey: 'processorId' }) // A processor can have many computer
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
      productCollection: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numberModel: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      cores: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      threads: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'Processor',
      underscored: true,
      sequelize
    }
  )
}
