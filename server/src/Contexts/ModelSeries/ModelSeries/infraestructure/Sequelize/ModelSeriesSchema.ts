import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
import { type ModelSeriesName } from '../../domain/ModelSeriesName'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type BrandId } from '../../../../Brand/domain/BrandId'

export class ModelSeriesModel extends Model<ModelSeriesPrimitives> implements ModelSeriesPrimitives {
  readonly id!: Primitives<ModelSeriesId>
  readonly name!: Primitives<ModelSeriesName>
  readonly categoryId!: Primitives<CategoryId>
  readonly brandId!: Primitives<BrandId>

  public static associate (models: Models): void {
    this.belongsTo(models.Category, { as: 'category' }) // A model series belongs to a category
    this.belongsTo(models.Brand, { as: 'brand' }) // A model series belongs to a brand
    this.hasMany(models.Device, { as: 'device' }) // A model series can have many devices
    this.hasOne(models.ModelComputer, { as: 'modelComputer', foreignKey: 'modelSeriesId' }) // A model series has one computer model (if it is a computer)
    this.hasOne(models.ModelLaptop, { as: 'modelLaptop', foreignKey: 'modelSeriesId' }) // A model series has one laptop model (if it is a laptop)
    this.hasOne(models.ModelMonitor, { as: 'modelMonitor', foreignKey: 'modelSeriesId' }) // A model series has one monitor model (if it is a monitor)
  }
}

export function initModelSeriesModel (sequelize: Sequelize): void {
  ModelSeriesModel.init(
    {
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
        type: DataTypes.INTEGER,
        allowNull: false
      },
      brandId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      modelName: 'Model',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}
