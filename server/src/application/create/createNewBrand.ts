import { type Brand, type CreateBrand } from '../../domain/entities/DeviceAggregation/brand.entity'
import { type Repository } from '../../domain/repositories/respoitory'
import { createFunction } from '../../utils/createFunction'

interface Props {
  payload: CreateBrand
  repository: Repository
}

export async function createNewBrand ({ payload, repository }: Props): Promise<Brand | undefined> {
  await createFunction({ storeName: 'Marca', payload, store: repository.brand })
  return await repository.brand.create(payload)
}
