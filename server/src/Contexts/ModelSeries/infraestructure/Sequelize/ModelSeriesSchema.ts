import { DataTypes, Model, type Sequelize, type InitOptions, type ModelAttributes } from 'sequelize'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'

export const ModelSeriesSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}
export class ModelSeriesModel extends Model<ModelSeriesPrimitives> implements ModelSeriesPrimitives {
  readonly id!: string
  readonly name!: string
  readonly categoryId!: number
  readonly brandId!: string

  static config (sequelize: Sequelize): InitOptions {
    return {
      modelName: 'Model',
      timestamps: true,
      underscored: true,
      sequelize
    }
  }
}
