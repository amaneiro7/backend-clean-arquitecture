import { type Repository } from '../../../shared/repository'
import { type Brand } from '../domain/Brand'

export async function allBrandGetter ({ repository }: { repository: Repository }): Promise<Brand[]> {
  return await repository.brand.getAll()
}
