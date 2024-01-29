import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type CategoryPrimitives } from '../../domain/Category'

export class CategoryModel extends Model<CategoryPrimitives> implements CategoryPrimitives {
  readonly id!: number
  readonly name!: string
}

export function initCategoryModel (sequelize: Sequelize): void {
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
      timestamps: false,
      sequelize
    }
  )
}
