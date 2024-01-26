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
  },
  categoryId: {
    field: 'category_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  brandId: {
    field: 'brand_id',
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'brands',
      key: 'id'
    }
  }
}
export class ModelSeriesModel extends Model<ModelSeriesPrimitives> implements ModelSeriesPrimitives {
  readonly id!: string
  readonly name!: string
  readonly brandId!: string
  readonly categoryId!: string

  static config (sequelize: Sequelize): InitOptions {
    return {
      tableName: 'modelSeries',
      modelName: 'ModelSeries',
      timestamps: true,
      updatedAt: true,
      sequelize
    }
  }
}
