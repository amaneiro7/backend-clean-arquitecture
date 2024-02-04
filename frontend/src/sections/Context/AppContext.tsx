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

export interface ContextState {
  devices: DevicePrimitives[]
  status: StatusPrimitives[]
  categories: CategoryPrimitives[]
  brands: BrandPrimitives[]
  createDevice: (device: { serial: string, activo: string | null, statusId: number, modelId: string }) => Promise<void>
  createBrand: (brand: { name: string }) => Promise<void>
}

export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({
  children,
  repository
}: PropsWithChildren<{ repository: Repository }>) => {
  const { createDevice, devices } = useDevice(repository)
  const { status } = useStatus(repository)
  const { categories } = useCategory(repository)
  const { brands, createBrand } = useBrand(repository)

  return (
    <AppContext.Provider value={{ devices, status, categories, brands, createDevice, createBrand }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
