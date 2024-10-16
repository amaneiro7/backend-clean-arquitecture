import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type CategoryPrimitives } from '../../domain/Category'
import { type Models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type CategoryId } from '../../domain/CategoryId'
import { type CategoryName } from '../../domain/CategoryName'

export class CategoryModel extends Model<CategoryPrimitives> implements CategoryPrimitives {
  readonly id!: Primitives<CategoryId>
  readonly name!: Primitives<CategoryName>

  public static associate(models: Models): void {
    CategoryModel.hasMany(models.Model, { as: 'model', foreignKey: 'categoryId' }) // A category can have many model series
    CategoryModel.hasMany(models.Device, { as: 'device', foreignKey: 'categoryId' }) // A category can have many device
    CategoryModel.hasMany(models.DeviceHardDrive, { as: 'deviceHardDrive', foreignKey: 'categoryId' }) // A category can have many hard drive
    CategoryModel.hasMany(models.DeviceComputer, { as: 'deviceComputer', foreignKey: 'categoryId' }) // A category can have many computer
    CategoryModel.hasMany(models.DeviceMFP, { as: 'deviceMFP', foreignKey: 'categoryId' }) // A category can have many multifunctionalprinter
    CategoryModel.hasMany(models.ModelComputer, { as: 'modelComputer', foreignKey: 'categoryId' }) // A category can have many computer model
    CategoryModel.hasMany(models.ModelLaptop, { as: 'modelLaptop', foreignKey: 'categoryId' }) // A category can have many laptop model
    CategoryModel.hasMany(models.ModelMonitor, { as: 'modelMonitor', foreignKey: 'categoryId' }) // A category can have many monitor model
    CategoryModel.hasMany(models.ModelPrinter, { as: 'modelPrinter', foreignKey: 'categoryId' }) // A category can have many printer model
    CategoryModel.hasMany(models.ModelKeyboard, { as: 'modelKeyboard', foreignKey: 'categoryId' }) // A category can have many keyboard model
    CategoryModel.hasMany(models.ModelMouse, { as: 'modelMouse', foreignKey: 'categoryId' }) // A category can have many mouse model
  }
}

export function initCategoryModel(sequelize: Sequelize): void {
  CategoryModel.init(
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
      modelName: 'Category',
      underscored: true,
      timestamps: false,
      sequelize
    }
  )
}
