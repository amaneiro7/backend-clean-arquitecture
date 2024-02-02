import { type Repository } from '../../../shared/repository'
import { ensureBrandIsValid, type BrandCreate } from '../domain/Brand'

export async function brandCreator ({ repository, brand }: { repository: Repository, brand: BrandCreate }) {
  ensureBrandIsValid(brand)
  await repository.brand.save(brand)
}
