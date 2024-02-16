import { useEffect, useState } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { UserLocalLogin } from '../../modules/user/user/application/UserLogin'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import Cookie from 'js-cookie'
import { useLocation } from 'react-router-dom'

export const useLogin = (repository: Repository) => {
  const [user, setUser] = useState<UserPrimitives | null>(null)
  const location = useLocation()

  async function getLogin ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
    await new UserLocalLogin(repository)
      .login(email, password).then((user) => {
        setUser(user)
      })
  }

  function logout () {
    setUser(null)
    Cookie.remove('accessToken', { path: '/' })
  }

  useEffect(() => {
    const token = Cookie.get('accessToken')
    console.log(token)
    if (token === undefined) {
      // logout()
    }
  }, [location.pathname, user])

  return {
    getLogin,
    logout,
    user
  }
}
