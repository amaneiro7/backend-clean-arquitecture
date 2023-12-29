import { badRequest, conflict, notFound } from '@hapi/boom'
import { type BrandRepositotoryInterface } from '../infrastructure/persistance/local-file-system/brand'
import { type StoreNameValue, type Id } from '../types/types'
import { type UpdateBrand } from '../domain/entities/brand.entity'

type Props = BrandProps

interface BrandProps {
  storeName: StoreNameValue
  store: BrandRepositotoryInterface
  id: Id
  payload: UpdateBrand
}
export async function updateFunction ({ storeName, store, id, payload }: Props): Promise<any> {
  const itemToChange = await store.getById.exec({ id })
  if (itemToChange === undefined || itemToChange === null) {
    throw notFound('Marca no encontrada')
  }

  const { name } = payload
  if (name === undefined) {
    throw badRequest('Falta informacion')
  }

  if (name === itemToChange.name) return

  const array = await store.getByName.exec({ name })
  if (array !== undefined) {
    throw conflict(`Ya existe una ${storeName} con ese nombre`)
  }
}
