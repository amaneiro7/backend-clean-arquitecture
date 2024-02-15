import { useEffect, useState } from 'react'
import { type Repository } from '../../modules/shared/domain/repository'
import { UserLocalLogin } from '../../modules/user/user/application/UserLogin'
import { type UserPrimitives } from '../../modules/user/user/domain/User'
import Cookie from 'js-cookie'
// import { useNavigate } from 'react-router-dom'

export const useLogin = (repository: Repository) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState<UserPrimitives | null>(null)
  //   const navigate = useNavigate()

  async function getLogin ({ email, password }: Pick<UserPrimitives, 'email' | 'password'>) {
    const userLocalLogin = new UserLocalLogin(repository)
    setLoading(true)
    await userLocalLogin
      .login(email, password)
      .then((user) => {
        setUser(user)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  useEffect(() => {
    const token = Cookie.get('accessToken')
    if (!token) {
      console.log('No hay token', token)
      setUser(null)

    //   navigate('/login')
    }
    if (token) {
      console.log('Si hay token')
    }
  }, [window.history])
  console.log(window.history)

  console.log(user)

  return {
    getLogin,
    user,
    loading,
    error
  }
}
