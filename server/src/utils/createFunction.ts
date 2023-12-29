import { badRequest, conflict } from '@hapi/boom'
import { type BrandRepositotoryInterface } from '../infrastructure/persistance/local-file-system/brand'
import { type StoreNameValue } from '../types/types'
import { type CreateBrand } from '../domain/entities/brand.entity'

type Props = BrandProps

interface BrandProps {
  storeName: StoreNameValue
  store: BrandRepositotoryInterface
  payload: CreateBrand
}
export async function createFunction ({ storeName, store, payload }: Props): Promise<any> {
  const { name } = payload
  if (name === undefined) {
    throw badRequest('Falta informacion')
  }

  const array = await store.getByName.exec({ name })
  if (array !== undefined) {
    throw conflict(`Ya existe una ${storeName} con ese nombre`)
  }
}
