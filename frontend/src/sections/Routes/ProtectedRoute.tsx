import { useEffect, type PropsWithChildren } from 'react'
import { useAppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute ({ children }: PropsWithChildren) {
  const { useAuth: { user } } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true })
    }
  }, [navigate, user])

  return children
}
