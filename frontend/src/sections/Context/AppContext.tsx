import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { useDevice } from '../Device/device/useDevice'
import { type DevicePrimitives } from '../../modules/devices/devices/devices/domain/Device'

export interface ContextState {
  devices: DevicePrimitives[]
  createDevice: (device: { serial: string, activo: string | null, statusId: number, modelId: string }) => Promise<void>
}

export const AppContext = createContext<ContextState | undefined>(undefined)

export const AppContextProvider = ({
  children,
  repository
}: PropsWithChildren<{ repository: Repository }>) => {
  const { createDevice, devices } = useDevice(repository)

  return (
    <AppContext.Provider value={{ devices, createDevice }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
