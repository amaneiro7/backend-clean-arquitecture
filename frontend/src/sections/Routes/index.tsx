import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'
import Loading from '../components/Loading/index.tsx'

const Home = lazy(async () => await import('../page/home/index.tsx'))
const ListadoSitios = lazy(async () => await import('../page/ListadoSitios'))
const ListadoModelos = lazy(async () => await import('../page/ListadoModelos'))
const FilterByDevice = lazy(async () => await import('../page/FiltroPorDevice'))
const AlmacenPage = lazy(async () => await import('../page/Almacen/index.tsx'))
const EquiposAgenciaPage = lazy(async () => await import('../page/AgenciaPerDevice/index.tsx'))
const EquiposTorrePage = lazy(async () => await import('../page/AdministrativeSitePerDevice/index.tsx'))
const AdministrativeSitePerEmployee = lazy(async () => await import('../page/AdministrativeSitePerEmployee/index.tsx'))
const AgencySitePerEmployee = lazy(async () => await import('../page/AgenciaPerEmployee/index.tsx'))

const CreateEmployeeForm = lazy(async () => await import('../page/FormEmployee/CreateEmployeeForm.tsx'))
const CreateDeviceForm = lazy(async () => await import('../page/FormDevice/CreateDeviceForm.tsx'))
const CreateBrandForm = lazy(async () => await import('../page/FormBrand/CreateBrandForm.tsx'))
const CreateModelForm = lazy(async () => await import('../page/FormModel/CreateModelForm.tsx'))
const CreateLocationForm = lazy(async () => await import('../page/FormLocation/CreateLocationForm.tsx'))
const CreateProcessorForm = lazy(async () => await import('../page/FormProcessor/CreateProcessorForm.tsx'))
const Login = lazy(async () => await import('../page/login/index.tsx'))
const NotFound = lazy(async () => await import('../page/404/index.tsx'))
const Layout = lazy(async () => await import('../components/Layout.tsx'));

export const privateRouter = [
  { path: '/', element: <Home /> },
  { path: '/location', element: <ListadoSitios /> },
  { path: '/location/add', element: <CreateLocationForm /> },
  { path: '/location/edit/:id', element: <CreateLocationForm /> },
  { path: '/almacen', element: <AlmacenPage /> },
  { path: '/equipos/agencia', element: <EquiposAgenciaPage /> },
  { path: '/equipos/torre', element: <EquiposTorrePage /> },
  { path: '/employees/torre', element: <AdministrativeSitePerEmployee /> },
  { path: '/employees/agencia', element: <AgencySitePerEmployee /> },
  { path: '/employee/add', element: <CreateEmployeeForm /> },
  { path: '/employee/edit/:id', element: <CreateEmployeeForm /> },
  { path: '/device/add', element: <CreateDeviceForm /> },
  { path: '/device/edit/:id', element: <CreateDeviceForm /> },
  { path: '/brand/add', element: <CreateBrandForm /> },
  { path: '/brand/edit/:id', element: <CreateBrandForm /> },
  { path: '/model', element: <ListadoModelos /> },
  { path: '/model/add', element: <CreateModelForm /> },
  { path: '/model/edit/:id', element: <CreateModelForm /> },
  { path: '/processor/add', element: <CreateProcessorForm /> },
  { path: '/processor/edit/:id', element: <CreateProcessorForm /> },
  { path: '/devicefilter', element: <FilterByDevice /> }
]

export default function AppRoutes() {
  const { useAuth: { user } } = useAppContext()
  return (
    <Routes>      
      {
        privateRouter.map(route => (
          <Route key={route.path} path={route.path} element={
            <Suspense fallback={<Loading />}>
              <ProtectedRoute user={user} >
                <Layout>
                  {route.element}
                </Layout>
              </ProtectedRoute>
            </Suspense>
          } />
        ))
      }
      <Route path='/login' element={<Login user={user} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
