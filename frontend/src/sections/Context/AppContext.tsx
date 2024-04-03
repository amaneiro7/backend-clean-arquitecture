import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { type UseAuth, useLogin } from '../Auth/useLogin'
import { type UseCategory, useCategory } from '../Device/category/useCategory'
import { useDevice, type UseDevice } from '../Device/device/useDevice'
import { useStatus, type UseStatus } from '../Device/status/useStatus'
import { useLocation, type UseLocation } from '../Device/location/useLocation'
import { useSearchByCriteriaQuery } from '../Hooks/useQueryUpdate'
import { type SearchByCriteriaQuery } from '../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

export interface ContextState {
  repository: Repository
  useAuth: UseAuth
  category: UseCategory
  device: UseDevice
  status: UseStatus
  location: UseLocation
  addFilter: (payload: SearchByCriteriaQuery) => void
  cleanFilters: (payload?: SearchByCriteriaQuery) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({ children, repository }: PropsWithChildren<{ repository: Repository }>) => {
  const { query, addFilter, cleanFilters } = useSearchByCriteriaQuery()
  const useAuth = useLogin(repository)
  const category = useCategory(repository)
  const device = useDevice(repository, query)
  const status = useStatus(repository)
  const location = useLocation(repository)

  return (
    <AppContext.Provider value={{ repository, useAuth, category, device, status, location, addFilter, cleanFilters }}>
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
