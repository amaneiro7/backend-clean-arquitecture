import { DataTypes, type InitOptions, Model, type Sequelize, type ModelAttributes } from 'sequelize'
import { type BrandPrimitives } from '../../domain/Brand'

export const BRAND_TABLE = 'brands'

export const BrandSchema: ModelAttributes = {
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
}
export class BrandModel extends Model<BrandPrimitives> implements BrandPrimitives {
  public id!: string
  public name!: string

  static config (sequelize: Sequelize): InitOptions {
    return {
      modelName: 'Brand',
      timestamps: true,
      underscored: true,
      sequelize
    }
  }
}
