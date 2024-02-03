import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'

export interface ContextState {
  repository: Repository
}

export const InventarioContext = createContext({} satisfies ContextState)

export const InventarioContextProvider = ({
  children,
  repository
}: PropsWithChildren<{ repository: Repository }>) => {
  return (
    <InventarioContext.Provider value={{ repository }}>
      {children}
    </InventarioContext.Provider>
  )
}

export const useInventarioContext = () => {
  return useContext(InventarioContext)
}
