import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'
import { privateRouter } from './privateRouter.tsx'


const Login = lazy(async () => await import('../page/login/index.tsx'))
const NotFound = lazy(async () => await import('../page/404/index.tsx'))
const Layout = lazy(async () => await import('../components/Layout.tsx'));


export default function AppRoutes() {
  const { useAuth: { user } } = useAppContext()
  return (
    <Routes>      
      {
        privateRouter.map(route => (
          <Route
            key={route.path} path={route.path} element={
              
              <ProtectedRoute user={user}>
                {user && 
                  <Layout>
                    {route.element}
                  </Layout>}
              </ProtectedRoute>
              
          }
          />
        ))
      }
      <Route path='/login' element={<Login user={user} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
