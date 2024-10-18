import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type MainCategoryPrimitives } from '../../domain/MainCategory'
import { type MainCategoryId } from '../../domain/MainCategoryId'
import { type MainCategoryName } from '../../domain/MainCategoryName'

export class MainCategoryModel extends Model<MainCategoryPrimitives> implements MainCategoryPrimitives {
  readonly id!: Primitives<MainCategoryId>
  readonly name!: Primitives<MainCategoryName>

  public static associate(models: Models): void {
    MainCategoryModel.hasMany(models.Category, { as: 'category', foreignKey: 'mainCategoryId' }) // A main category can have many categories
  }
}

export function initMainCategoryModel(sequelize: Sequelize): void {
  MainCategoryModel.init(
    {
      id: {
        type: DataTypes.STRING,
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
      modelName: 'MainCategory',
      underscored: true,
      timestamps: false,
      sequelize
    }
  )
}
