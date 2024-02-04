import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { useDevice } from '../Device/device/useDevice'
import { type DevicePrimitives } from '../../modules/devices/devices/devices/domain/Device'
import { useStatus } from '../Device/status/useStatus'
import { type StatusPrimitives } from '../../modules/devices/devices/status/domain/Status'

export interface ContextState {
  devices: DevicePrimitives[]
  status: StatusPrimitives[]
  createDevice: (device: { serial: string, activo: string | null, statusId: number, modelId: string }) => Promise<void>
}

export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({
  children,
  repository
}: PropsWithChildren<{ repository: Repository }>) => {
  const { createDevice, devices } = useDevice(repository)
  const { status } = useStatus(repository)

  return (
    <AppContext.Provider value={{ devices, status, createDevice }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
