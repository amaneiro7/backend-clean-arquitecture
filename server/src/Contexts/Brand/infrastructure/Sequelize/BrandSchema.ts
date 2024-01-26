import { DataTypes, type InitOptions, Model, type Sequelize, type ModelAttributes } from 'sequelize'
import { type BrandPrimitives } from '../../domain/Brand'

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
      tableName: 'brands',
      modelName: 'Brand',
      timestamps: true,
      updatedAt: true,
      sequelize
    }
  }
}
