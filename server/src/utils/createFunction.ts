import { badRequest, conflict } from '@hapi/boom'
import { type StoreNameValue } from '../types/types'
import { type CreateBrand } from '../domain/entities/Device/brand.entity'
import { type BrandRepository } from '../domain/repositories/brand.repository'
import { type CreateModelSeries } from '../domain/entities/Device/modelSeries.entity'
import { type ModelSeriesRepository } from '../domain/repositories/modelSeries.repository'

type Props = BrandProps | ModelSeriesProps

interface BrandProps {
  storeName: StoreNameValue
  store: BrandRepository
  payload: CreateBrand
}
interface ModelSeriesProps {
  storeName: StoreNameValue
  store: ModelSeriesRepository
  payload: CreateModelSeries
}

export async function createFunction ({ storeName, store, payload }: Props): Promise<void> {
  const { name } = payload
  if (name === undefined) {
    throw badRequest('Falta informacion')
  }

  const array = await store.getByName(name)
  if (array !== undefined) {
    throw conflict(`Ya existe una ${storeName} con ese nombre`)
  }
}
