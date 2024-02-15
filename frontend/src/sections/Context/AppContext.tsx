import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import { useLogin } from '../Auth/useLogin'

export interface ContextState {
  repository: Repository
  user: UserPrimitives | undefined
}

export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({
  children,
  repository
}: PropsWithChildren<{ repository: Repository }>) => {
  const { user } = useLogin(repository)
  return (
    <AppContext.Provider value={{
      repository,
      user
    }}>{children}</AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
