import { createContext, useContext, type PropsWithChildren } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import { useLogin } from '../Auth/useLogin'

interface UseAuth {
  getLogin: ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) => Promise<void>
  user: UserPrimitives | null
}
export interface ContextState {
  repository: Repository
  useAuth: UseAuth
}

export const AppContext = createContext({} as ContextState)

export const AppContextProvider = ({ children, repository }: PropsWithChildren<{ repository: Repository }>) => {
  const useAuth = useLogin(repository)

  return (
    <AppContext.Provider value={{ repository, useAuth }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
