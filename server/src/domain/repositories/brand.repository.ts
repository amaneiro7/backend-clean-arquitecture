import { type CreateBrand, type Brand, type UpdateBrand } from '../entities/Device/brand.entity'
import { type GenericRepository } from './GenericRepository'

export interface BrandRepository extends GenericRepository<Brand, CreateBrand, UpdateBrand> {}
