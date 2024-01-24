import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type CategoryPrimitives } from '../../domain/Category'

export class CategoryModel extends Model<CategoryPrimitives> implements CategoryPrimitives {
  readonly id!: string
  readonly name!: string
}

CategoryModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
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
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,
    updatedAt: true,
    sequelize
  }
)
