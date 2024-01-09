import { type UpdateBrand, type Brand } from '../../domain/entities/Device/brand.entity'
import { type Id } from '../../types/types'
import { type Repository } from '../../domain/repositories/respoitory'
import { updateFunction } from '../../utils/updateFunction'

interface Props {
  id: Id
  payload: UpdateBrand
  repository: Repository
}

export async function updateBrand ({ id, payload, repository }: Props): Promise<Brand | undefined> {
  await updateFunction({ storeName: 'Marca', payload, id, store: repository.brand })
  return await repository.brand.update(id, payload)
}
