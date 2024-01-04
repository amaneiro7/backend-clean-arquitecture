import { type Brand } from '../../domain/entities/brand.entity'
import { type BrandRepository } from '../../domain/repositories/brand.repository'

export async function getAllBrands (brandRepository: BrandRepository): Promise<Brand[]> {
  return await brandRepository.getAll()
}
