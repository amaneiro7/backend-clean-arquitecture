import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type BrandPrimitives } from '../../domain/Brand'
import { ModelSeriesModel } from '../../../ModelSeries/infraestructure/Sequelize/ModelSeriesSchema'

// export interface BrandCreationAttributes extends Optional<BrandPrimitives, 'id'> {}
export class BrandModel extends Model<BrandPrimitives> implements BrandPrimitives {
  public id!: string
  public name!: string
}
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
    tableName: 'brands',
    modelName: 'Brand',
    timestamps: true,
    updatedAt: true,
    sequelize
  }
)

BrandModel.hasMany(ModelSeriesModel)
