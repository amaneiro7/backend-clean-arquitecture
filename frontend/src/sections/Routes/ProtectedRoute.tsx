import { useLayoutEffect, type PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPrimitives } from '../../modules/user/user/domain/User'

interface Props {
  user: UserPrimitives | null
}
export default function ProtectedRoute ({ children, user }: PropsWithChildren<Props>) {  
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (user === null) {
      navigate('/login', { replace: true })
    }
  }, [navigate, user])

  return children
}
