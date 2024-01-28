import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type BrandPrimitives } from '../../domain/Brand'
import { ModelSeriesModel } from '../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'

class BrandModel extends Model<BrandPrimitives> implements BrandPrimitives {
  public id!: string
  public name!: string
}

function initBrandModel (sequelize: Sequelize): void {
  BrandModel.init(
    {
      id: {
        type: DataTypes.UUID,
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
      modelName: 'Brand',
      timestamps: true,
      underscored: true,
      sequelize
    }
  )
}

BrandModel.hasMany(ModelSeriesModel)

export { BrandModel, initBrandModel }
