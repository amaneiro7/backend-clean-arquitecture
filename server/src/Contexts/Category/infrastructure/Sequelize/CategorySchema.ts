import { DataTypes, type InitOptions, Model, type Sequelize, type ModelAttributes } from 'sequelize'
import { type CategoryPrimitives } from '../../domain/Category'
import { ModelSeriesModel } from '../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'

export const CategorySchema: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  }
}

class CategoryModel extends Model<CategoryPrimitives> implements CategoryPrimitives {
  readonly id!: number
  readonly name!: string

  static config (sequelize: Sequelize): InitOptions {
    return {
      modelName: 'Category',
      underscored: true,
      timestamps: true,
      sequelize
    }
  }
}

function initCategoryModel (sequelize: Sequelize): void {
  CategoryModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      modelName: 'Category',
      underscored: true,
      timestamps: true,
      sequelize
    }
  )
}

CategoryModel.hasMany(ModelSeriesModel)

export { CategoryModel, initCategoryModel }
