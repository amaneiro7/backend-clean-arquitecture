import { Navigate, useLocation } from 'react-router-dom'
import { UserPrimitives } from '../../modules/user/user/domain/User'

interface Props {
  user: UserPrimitives | null
}
export function ProtectedRoute({ children, user }: React.PropsWithChildren<Props>) {
  const location = useLocation()

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
