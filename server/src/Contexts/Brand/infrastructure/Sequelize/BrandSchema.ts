import { CreationOptional, type InferAttributes, type InferCreationAttributes, Model } from 'sequelize'
import { type BrandPrimitives as BrandDomain } from '../../domain/Brand'

class Brand extends Model<InferAttributes<BrandDomain>, InferCreationAttributes<BrandDomain>> {
  declare id: string
  declare name: string
}
