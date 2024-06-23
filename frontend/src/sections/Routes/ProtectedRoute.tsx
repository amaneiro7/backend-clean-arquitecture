import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPrimitives } from '../../modules/user/user/domain/User'

interface Props {
  user: UserPrimitives | null
}
export default function ProtectedRoute({ children, user }: React.PropsWithChildren<Props>) {
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true })
    }
  }, [navigate, user])

  return user && children
}
