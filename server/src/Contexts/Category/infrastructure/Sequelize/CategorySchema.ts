import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type CategoryPrimitives } from '../../domain/Category'
import { type Models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class CategoryModel extends Model<CategoryPrimitives> implements CategoryPrimitives {
  readonly id!: number
  readonly name!: string

  public static associate (models: Models): void {
    CategoryModel.hasMany(models.Model, { as: 'model' }) // A category can have many model series
    CategoryModel.hasMany(models.HardDrive, { as: 'hardDrive' }) // A category can have many hard drive
    CategoryModel.hasMany(models.Computer, { as: 'computer' }) // A category can have many computer
    CategoryModel.hasMany(models.ModelComputer, { as: 'computerModel' }) // A category can have many computer model
  }
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
