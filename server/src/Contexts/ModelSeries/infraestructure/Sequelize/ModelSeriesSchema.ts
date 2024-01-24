import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'

export class ModelSeriesModel extends Model<ModelSeriesPrimitives> implements ModelSeriesPrimitives {
  readonly id!: string
  readonly name!: string
  readonly brandId!: string
  readonly categoryId!: string
}

ModelSeriesModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
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
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    brandId: {
      field: 'brand_id',
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'brands',
        key: 'id'
      }
    }
  },
  {
    tableName: 'modelSeries',
    modelName: 'ModelSeries',
    timestamps: true,
    updatedAt: true,
    sequelize
  }
)
