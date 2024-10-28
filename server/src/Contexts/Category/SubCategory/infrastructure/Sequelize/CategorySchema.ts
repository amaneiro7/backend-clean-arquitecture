import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type CategoryPrimitives } from '../../domain/Category'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type CategoryId } from '../../domain/CategoryId'
import { type CategoryName } from '../../domain/CategoryName'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type MainCategoryId } from '../../../Category/domain/MainCategoryId'



export class CategoryModel extends Model<CategoryPrimitives> implements CategoryPrimitives {
  readonly id!: Primitives<CategoryId>
  readonly name!: Primitives<CategoryName>
  readonly mainCategoryId!: Primitives<MainCategoryId>

  public static associate(models: Models): void {
    this.belongsTo(models.MainCategory, { as: 'mainCategory', foreignKey: 'mainCategoryId' }) // A category can have one main category
    this.hasMany(models.Model, { as: 'model', foreignKey: 'categoryId' }) // A category can have many model series
    this.hasMany(models.Device, { as: 'device', foreignKey: 'categoryId' }) // A category can have many device
    this.hasMany(models.DeviceHardDrive, { as: 'deviceHardDrive', foreignKey: 'categoryId' }) // A category can have many hard drive
    this.hasMany(models.DeviceComputer, { as: 'deviceComputer', foreignKey: 'categoryId' }) // A category can have many computer
    this.hasMany(models.DeviceMFP, { as: 'deviceMFP', foreignKey: 'categoryId' }) // A category can have many multifunctionalprinter
    this.hasMany(models.ModelComputer, { as: 'modelComputer', foreignKey: 'categoryId' }) // A category can have many computer model
    this.hasMany(models.ModelLaptop, { as: 'modelLaptop', foreignKey: 'categoryId' }) // A category can have many laptop model
    this.hasMany(models.ModelMonitor, { as: 'modelMonitor', foreignKey: 'categoryId' }) // A category can have many monitor model
    this.hasMany(models.ModelPrinter, { as: 'modelPrinter', foreignKey: 'categoryId' }) // A category can have many printer model
    this.hasMany(models.ModelKeyboard, { as: 'modelKeyboard', foreignKey: 'categoryId' }) // A category can have many keyboard model
    this.hasMany(models.ModelMouse, { as: 'modelMouse', foreignKey: 'categoryId' }) // A category can have many mouse model
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
      },
      mainCategoryId: {
        allowNull: false,
        type: DataTypes.STRING,
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
