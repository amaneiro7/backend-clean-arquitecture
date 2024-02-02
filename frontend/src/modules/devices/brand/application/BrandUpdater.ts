import { type Repository } from '../../../shared/repository'
import { type BrandCreate, ensureBrandIsValid } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'

export async function brandUpdater ({ repository, id, brand }: { repository: Repository, id: string, brand: BrandCreate }) {
  const brandId = new BrandId(id).value

  ensureBrandIsValid(brand)
  await repository.brand.update({ brand, id: brandId })
}
