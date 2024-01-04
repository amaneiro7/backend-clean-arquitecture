import { type CreateBrand, type Brand, type UpdateBrand } from '../entities/brand.entity'
import { type Repository } from './repository'

export interface BrandRepository extends Repository<Brand, CreateBrand, UpdateBrand> {}
