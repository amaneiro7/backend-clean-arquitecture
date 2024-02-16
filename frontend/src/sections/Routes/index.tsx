import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext.tsx'

const Home = lazy(async () => await import('../home/index.tsx'))
const ComputerPage = lazy(async () => await import('../Device/features/computer/ComputerTablePage.tsx'))
const CreateDeviceForm = lazy(async () => await import('../Device/device/CreateDeviceForm.tsx'))
const CreateBrandForm = lazy(async () => await import('../Device/brand/CreateBrandForm.tsx'))
const CreateModelForm = lazy(async () => await import('../Device/model/CreateModelForm.tsx'))
const CreateProcessorForm = lazy(async () => await import('../Device/features/processor/CreateProcessorForm.tsx'))
const Login = lazy(async () => await import('../page/login/index.tsx'))
const NotFound = lazy(async () => await import('../page/404/index.tsx'))

export const appRoutes = [
  { path: '/', auth: 'public', element: <Home /> },
  { path: '/computer', auth: 'public', element: <ComputerPage /> },
  { path: '/login', auth: 'public', element: <Login /> },
  { path: '/device/add', auth: 'public', element: <CreateDeviceForm /> },
  { path: '/device/edit/:id', auth: 'public', element: <CreateDeviceForm /> },
  { path: '/brand/add', auth: 'public', element: <CreateBrandForm /> },
  { path: '/brand/edit/:id', auth: 'public', element: <CreateBrandForm /> },
  { path: '/model/add', auth: 'public', element: <CreateModelForm /> },
  { path: '/model/edit/:id', auth: 'public', element: <CreateModelForm /> },
  { path: '/processor/add', auth: 'public', element: <CreateProcessorForm /> },
  { path: '/processor/edit/:id', auth: 'public', element: <CreateProcessorForm /> },
  { path: '*', auth: 'public', element: <NotFound /> }
]

export const AppRoutes = () => {
  const { useAuth: { user } } = useAppContext()
  const isProtected = user != null
  return (
     <Routes>
        {appRoutes.map((route, index) => {
          if (route.auth === 'public') {
            return (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
            )
          } else {
            return (
                      <Route
                          key={index}
                          path={route.path}
                          element={!isProtected ? <Navigate to={'/login'} /> : route.element}

                      />
            )
          }
        })}
     </Routes>
  )
}
