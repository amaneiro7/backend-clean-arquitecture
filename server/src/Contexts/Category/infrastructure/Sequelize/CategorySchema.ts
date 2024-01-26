import { DataTypes, type InitOptions, Model, type Sequelize, type ModelAttributes } from 'sequelize'
import { type CategoryPrimitives } from '../../domain/Category'

export const CATEGORY_TABLE = 'categories'

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

export class CategoryModel extends Model<CategoryPrimitives> implements CategoryPrimitives {
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
