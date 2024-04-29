import { useLayoutEffect, useState } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import Cookie from 'js-cookie'
import { Login } from '../../modules/user/auth/application/Login'
import { CheckToken } from '../../modules/user/auth/application/checkToken'
import { LogOutSession } from '../../modules/user/user/application/logOutSession'
import { useLocation } from 'react-router-dom'
import { SaveSession } from '../../modules/user/user/application/saveSession'
import { GetSession } from '../../modules/user/user/application/getSession'

export interface UseAuth {
  getLogin: ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) => Promise<void>
  user: UserPrimitives | null
  logout: () => Promise<void>
  isSignin: boolean
}

export const useLogin = (repository: Repository) => {
  const [user, setUser] = useState<UserPrimitives | null>(null)
  const [isSignin, setIsSignin] = useState<boolean>(false)
  const location = useLocation()

  async function getLogin ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
    await new Login(repository)
      .run(email, password).then(async (user) => {
        if (await new CheckToken(repository).run()) {
          await new SaveSession(repository).save(user)
          setUser(user)
          setIsSignin(true)
        }
      })
  }

  useLayoutEffect(() => {
    if (location.pathname === '/login') return
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkCookieAndUser()
  }, [location])

  async function checkCookieAndUser () {
    await new CheckToken(repository).run().then(async () => {
      const userFromSession = await new GetSession(repository).get()
      setUser(userFromSession)
      setIsSignin(true)
    }).catch(async () => {
      await logout()
    })
  }

  async function logout () {
    setUser(null)
    setIsSignin(false)
    await new LogOutSession(repository).run()
    Cookie.remove('accessToken', { path: '/' })
  }

  return {
    getLogin,
    logout,
    user,
    isSignin
  }
}
