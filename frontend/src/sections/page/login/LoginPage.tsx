import { lazy } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { type UserPrimitives } from '../../../modules/user/user/domain/User'

const FormLogin = lazy(() => import('./FormLogin').then(m => ({ default: m.FormLogin })))

export default function Login({ user }: { user: UserPrimitives | null }) {  
  const location = useLocation()  

  if (!user) {
    return <FormLogin />
  } 

  return <Navigate to={location?.state?.from?.pathName ?? '/'} replace />  
}

