import { useCallback, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Cookie from 'js-cookie'
import { type Repository } from '../../modules/shared/domain/repository'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import { Login } from '../../modules/user/auth/application/Login'
import { CheckToken } from '../../modules/user/auth/application/checkToken'
import { LogOutSession } from '../../modules/user/user/application/logOutSession'
import { SaveSession } from '../../modules/user/user/application/saveSession'
import { GetSession } from '../../modules/user/user/application/getSession'

export interface UseAuth {
  getLogin: ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) => Promise<UserPrimitives>
  user: UserPrimitives | null
  logout: () => Promise<void>
  isSignin: boolean
  loading: boolean
}

export const useLogin = (repository: Repository): UseAuth => {
  const [user, setUser] = useState<UserPrimitives | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [isSignin, setIsSignin] = useState<boolean>(false)
  const location = useLocation()

  async function getLogin({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
    setLoading(true)
    return await new Login(repository)
      .run(email, password)
      .then(async (user) => {
        if (await new CheckToken(repository).run()) {          
          await new SaveSession(repository).save(user)
          setUser(user)
          setIsSignin(true)
          return user
        }
      })
      .finally(() => setLoading(false))
    }
    const logout = useCallback(async () => {
      setUser(null)
      setIsSignin(false)
      await new LogOutSession(repository).run()
      Cookie.remove('accessToken', { path: '/' })
    },[repository])
  
  const checkCookieAndUser = useCallback(async () => {
    return await new CheckToken(repository).run().then(async () => {
      const userFromSession = await new GetSession(repository).get()
      setUser(userFromSession)
      setIsSignin(true)
    }).catch(async () => {
      await logout()
    })
  },[logout, repository])

  useLayoutEffect(() => {
    checkCookieAndUser()
  }, [checkCookieAndUser, location.pathname])
  
  return {
    getLogin,
    logout,
    loading,
    user,
    isSignin
  }
}
