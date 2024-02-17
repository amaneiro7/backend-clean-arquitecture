import { useEffect, type PropsWithChildren } from 'react'
import { useAppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = PropsWithChildren

export default function ProtectedRoute ({ children }: ProtectedRouteProps) {
  const { useAuth: { user } } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true })
    }
  }, [navigate, user])

  return children
}
