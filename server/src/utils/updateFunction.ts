import { badRequest, conflict, notFound } from '@hapi/boom'
import { type BrandRepositoryInterface } from '../infrastructure/persistance/local-file-system/brand'
import { type StoreNameValue, type Id } from '../types/types'
import { type UpdateBrand } from '../domain/entities/brand.entity'
import { type UpdateDevice } from '../domain/entities/device.entity'
import { type DeviceRepositoryInterface } from '../infrastructure/persistance/local-file-system/device'
import { type ModelRepositotoryInterface } from '../infrastructure/persistance/local-file-system/modelSeries'
import { type UpdateModelSeries } from '../domain/entities/modelSeries.entity'

type Props = BrandProps | ModelSeriesProps

interface ModelSeriesProps {
  storeName: StoreNameValue
  store: ModelRepositotoryInterface
  id: Id
  payload: UpdateModelSeries
}
interface BrandProps {
  storeName: StoreNameValue
  store: BrandRepositoryInterface
  id: Id
  payload: UpdateBrand
}
interface DeviceProps {
  storeName: StoreNameValue
  store: DeviceRepositoryInterface
  id: Id
  payload: UpdateDevice
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
