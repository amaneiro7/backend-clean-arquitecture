import { useEffect, useState } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import Cookie from 'js-cookie'
import { Login } from '../../modules/user/auth/application/Login'

export const useLogin = (repository: Repository) => {
  const [user, setUser] = useState<UserPrimitives | null>(null)

  async function getLogin ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
    await new Login(repository)
      .run(email, password).then((user) => {
        setUser(user)
      })
  }

  useEffect(() => {

  })

  function logout () {
    setUser(null)
    Cookie.remove('token', { path: '/' })
  }

  return {
    getLogin,
    logout,
    user
  }
}
