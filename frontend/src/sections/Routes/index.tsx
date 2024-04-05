import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.tsx'
import { Layout } from '../components/layout/index.tsx'
import Loading from '../components/Loading/index.tsx'

const Home = lazy(async () => await import('../page/home/index.tsx'))
const AlmacenPage = lazy(async () => await import('../page/Almacen/index.tsx'))
const AgenciaPage = lazy(async () => await import('../page/Agencia/index.tsx'))
const ComputerPage = lazy(async () => await import('../Device/features/computer/ComputerTablePage.tsx'))
const CreateDeviceForm = lazy(async () => await import('../Device/device/CreateDeviceForm.tsx'))
const CreateBrandForm = lazy(async () => await import('../Device/brand/CreateBrandForm.tsx'))
const CreateModelForm = lazy(async () => await import('../Device/model/CreateModelForm.tsx'))
const CreateProcessorForm = lazy(async () => await import('../Device/features/processor/CreateProcessorForm.tsx'))
const Login = lazy(async () => await import('../page/login/index.tsx'))
const NotFound = lazy(async () => await import('../page/404/index.tsx'))

export const privateRouter = [
  { path: '/', element: <Home /> },
  { path: '/almacen', element: <AlmacenPage /> },
  { path: '/agencia', element: <AgenciaPage /> },
  { path: '/computer', element: <ComputerPage /> },
  { path: '/device/add', element: <CreateDeviceForm /> },
  { path: '/device/edit/:id', element: <CreateDeviceForm /> },
  { path: '/brand/add', element: <CreateBrandForm /> },
  { path: '/brand/edit/:id', element: <CreateBrandForm /> },
  { path: '/model/add', element: <CreateModelForm /> },
  { path: '/model/edit/:id', element: <CreateModelForm /> },
  { path: '/processor/add', element: <CreateProcessorForm /> },
  { path: '/processor/edit/:id', element: <CreateProcessorForm /> }
]

export const AppRoutes = () => {
  return (
    <Routes>
      {
        privateRouter.map(route => (
          <Route key={route.path} path={route.path} element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <Layout>
                    {route.element}
                  </Layout>
                </ProtectedRoute>
              </Suspense>
          } />
        ))
      }
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
