import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { useDevice } from '../Device/device/useDevice'
import { type DevicePrimitives } from '../../modules/devices/devices/devices/domain/Device'
import { useStatus } from '../Device/status/useStatus'
import { type StatusPrimitives } from '../../modules/devices/devices/status/domain/Status'
import { useCategory } from '../Device/category/useCategory'
import { type CategoryPrimitives } from '../../modules/devices/category/domain/Category'
import { useBrand } from '../Device/brand/useBrand'
import { type BrandPrimitives } from '../../modules/devices/brand/domain/Brand'
import { useModel } from '../Device/model/useMode'
import { type ModelPrimitives } from '../../modules/devices/model/domain/Model'
import { type DeviceGetter } from '../../modules/devices/devices/devices/application/DeviceGetter'

export interface ContextState {
  devices: DevicePrimitives[]
  handleHasUrlSearch: () => void
  getDevice: DeviceGetter
  status: StatusPrimitives[]
  categories: CategoryPrimitives[]
  brands: BrandPrimitives[]
  models: ModelPrimitives[]
  createDevice: (device: { serial: string, activo: string | null, statusId: number, modelId: string }) => Promise<void>
  createBrand: (brand: { name: string }) => Promise<void>
  createModel: (model: { name: string, categoryId: number, brandId: string }) => Promise<void>
}

export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({
  children,
  repository
}: PropsWithChildren<{ repository: Repository }>) => {
  const { devices, handleHasUrlSearch, createDevice, getDevice } = useDevice(repository)
  const { status } = useStatus(repository)
  const { categories } = useCategory(repository)
  const { brands, createBrand } = useBrand(repository)
  const { models, createModel } = useModel(repository)

  return (
    <AppContext.Provider value={{
      devices,
      handleHasUrlSearch,
      status,
      categories,
      brands,
      models,
      getDevice,
      createDevice,
      createBrand,
      createModel
    }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
