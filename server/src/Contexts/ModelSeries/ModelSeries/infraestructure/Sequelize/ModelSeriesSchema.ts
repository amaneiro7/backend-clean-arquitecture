import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'

export class ModelSeriesModel extends Model<ModelSeriesPrimitives> implements ModelSeriesPrimitives {
  readonly id!: string
  readonly name!: string
  readonly categoryId!: number
  readonly brandId!: string
}
export function initModelSeriesModel (sequelize: Sequelize): void {
  ModelSeriesModel.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brandId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      modelName: 'Model',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
