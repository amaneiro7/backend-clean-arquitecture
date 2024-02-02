import { type Repository } from '../../../shared/domain/repository'
import { type Brand } from '../domain/Brand'

export async function allBrandGetter ({ repository }: { repository: Repository }): Promise<Brand[]> {
  return await repository.brand.getAll()
}
