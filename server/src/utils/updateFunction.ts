import { badRequest, conflict, notFound } from '@hapi/boom'
import { type StoreNameValue, type Id } from '../types/types'
import { type UpdateBrand } from '../domain/entities/Device/brand.entity'
import { type UpdateModelSeries } from '../domain/entities/Device/modelSeries.entity'
import { type ModelSeriesRepository } from '../domain/repositories/modelSeries.repository'
import { type BrandRepository } from '../domain/repositories/brand.repository'

type Props = BrandProps | ModelSeriesProps

interface ModelSeriesProps {
  storeName: StoreNameValue
  store: ModelSeriesRepository
  id: Id
  payload: UpdateModelSeries
}
interface BrandProps {
  storeName: StoreNameValue
  store: BrandRepository
  id: Id
  payload: UpdateBrand
}

export async function updateFunction ({ storeName, store, id, payload }: Props): Promise<any> {
  const itemToChange = await store.getById(id)
  if (itemToChange === undefined || itemToChange === null) {
    throw notFound(`${storeName} no encontrada`)
  }

  const { name } = payload
  if (name === undefined) {
    throw badRequest('Falta informacion')
  }

  if (name.toLowerCase().trim() === itemToChange.name.toLowerCase().trim()) return

  const array = await store.getByName(name)
  if (array !== undefined) {
    throw conflict(`Ya existe una ${storeName} con ese nombre`)
  }
}
