import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type BrandPrimitives } from '../../domain/Brand'

export class BrandModel extends Model<BrandPrimitives> implements BrandPrimitives {
  public id!: string
  public name!: string
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
