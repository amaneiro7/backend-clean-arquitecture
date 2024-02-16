import { useEffect, useState } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { UserLocalLogin } from '../../modules/user/user/application/UserLogin'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const useLogin = (repository: Repository) => {
  const [user, setUser] = useState<UserPrimitives | null>(null)
  // const navigate = useNavigate()

  async function getLogin ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
    await new UserLocalLogin(repository)
      .login(email, password).then((user) => {
        setUser(user)
      })
  }

  useEffect(() => {
    const token = Cookie.get('accessToken')
    if (token === undefined) {
      console.log(token)
      setUser(null)
      // navigate('login')
    } else {
      //
    }
  }, [])

  return {
    getLogin,
    user
  }
}
