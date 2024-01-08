import { type Brand } from '../../domain/entities/DeviceAggregation/brand.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getAllBrands (repository: Repository): Promise<Brand[]> {
  return await repository.brand.getAll()
}
