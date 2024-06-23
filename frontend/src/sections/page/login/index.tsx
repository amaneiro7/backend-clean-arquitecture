import { lazy, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { type UserPrimitives } from '../../../modules/user/user/domain/User'

const FormLogin = lazy(() => import('./FormLogin').then(m => ({ default: m.FormLogin })))

export default function Login({ user }: { user: UserPrimitives | null }) {
  const navigate = useNavigate()
  useEffect(() => {
    if (user !== null) {
      const previousPage = document.referrer
      const domain = window.location.origin
      const sameDomain = previousPage.includes(domain)
      if (sameDomain) {
        window.history.back()
      } else {
        navigate('/')
      }
    }
  }, [navigate, user])

  return (
    !user && <FormLogin navigate={navigate} />
  )
}

