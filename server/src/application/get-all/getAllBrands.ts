import { type Brand } from '../../domain/entities/brand.entity'
import { type Repository } from '../../domain/repositories/respoitory'

export async function getAllBrands (repository: Repository): Promise<Brand[]> {
  console.log(repository)
  return await repository.brand.getAll()
}
