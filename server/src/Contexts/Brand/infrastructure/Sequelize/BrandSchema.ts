import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type BrandPrimitives } from '../../domain/Brand'
import { type Models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'

export class BrandModel extends Model<BrandPrimitives> implements BrandPrimitives {
  public id!: string
  public name!: string

  public static associate (models: Models): void {
    this.hasMany(models.Model, { as: 'model' }) // A brand can have many model series
  }
}

export function initBrandModel (sequelize: Sequelize): void {
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
