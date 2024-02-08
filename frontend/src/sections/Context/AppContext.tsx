import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'

export interface ContextState {
  repository: Repository
}

export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({
  children,
  repository
}: PropsWithChildren<{ repository: Repository }>) => {
  return (
    <AppContext.Provider value={{
      repository
    }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
