import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { CategoryModel } from '../../../Category/infrastructure/Sequelize/CategorySchema'
import { BrandModel } from '../../../Brand/infrastructure/Sequelize/BrandSchema'
import { DeviceModel } from '../../../Device/infraestructure/sequelize/DeviceSchema'

class ModelSeriesModel extends Model<ModelSeriesPrimitives> implements ModelSeriesPrimitives {
  readonly id!: string
  readonly name!: string
  readonly categoryId!: number
  readonly brandId!: string
}
function initModelSeriesModel (sequelize: Sequelize): void {
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
        type: DataTypes.STRING,
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

ModelSeriesModel.belongsTo(CategoryModel, { as: 'category' })
ModelSeriesModel.belongsTo(BrandModel, { as: 'brand' })
ModelSeriesModel.hasMany(DeviceModel, { as: 'device' })

export { ModelSeriesModel, initModelSeriesModel }
