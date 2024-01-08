import { type CreateBrand, type Brand, type UpdateBrand } from '../entities/DeviceAggregation/brand.entity'
import { type GenericRepository } from './GenericRepository'

export interface BrandRepository extends GenericRepository<Brand, CreateBrand, UpdateBrand> {}
