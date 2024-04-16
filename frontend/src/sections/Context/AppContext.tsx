import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { type UseAuth, useLogin } from '../Auth/useLogin'
import { type UseCategory, useCategory } from '../Device/category/useCategory'
import { useDevice, type UseDevice } from '../Device/device/useDevice'
import { useStatus, type UseStatus } from '../Device/status/useStatus'
import { useLocation, type UseLocation } from '../Device/location/useLocation'
import { useEmployee, type UseEmployee } from '../Device/employee/useEmployee'
import { type UseCargo, useCargo } from '../Device/cargo/useCargo'
import { useCoordinacion, type UseCoordinacion } from '../Device/area/Coordinacion/useCoordinacion'
import { useGerencia, type UseGerencia } from '../Device/area/Gerencia/useGerencia'
import { useVicepresidencia, type UseVicepresidencia } from '../Device/area/vicepresidencia/useVicepresidencia'
import { useVicepresidenciaEjecutiva, type UseVicepresidenciaEjecutiva } from '../Device/area/vicepresidenciaEjecutivaId/useVicepresidenciaEjecutiva'

export interface ContextState {
  repository: Repository
  useAuth: UseAuth
  category: UseCategory
  // device: UseDevice
  status: UseStatus
  location: UseLocation
  // employee: UseEmployee
  cargo: UseCargo
  coordinacion: UseCoordinacion
  gerencia: UseGerencia
  vicepresidencia: UseVicepresidencia
  vicepresidenciaEjecutiva: UseVicepresidenciaEjecutiva
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({ children, repository }: PropsWithChildren<{ repository: Repository }>) => {
  const useAuth = useLogin(repository)
  const category = useCategory(repository)
  const status = useStatus(repository)
  const location = useLocation(repository)
  const cargo = useCargo(repository)
  const coordinacion = useCoordinacion(repository)
  const gerencia = useGerencia(repository)
  const vicepresidencia = useVicepresidencia(repository)
  const vicepresidenciaEjecutiva = useVicepresidenciaEjecutiva(repository)

  return (
    <AppContext.Provider value={{
      repository,
      useAuth,
      category,
      status,
      location,
      cargo,
      coordinacion,
      gerencia,
      vicepresidencia,
      vicepresidenciaEjecutiva
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}
