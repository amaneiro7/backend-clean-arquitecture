import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext.tsx'

const ProtectedRoute = lazy(async () => import('./ProtectedRoute.tsx').then(m => ({ default: m.ProtectedRoute })))
const Login = lazy(async () => import('../page/login/LoginPage.tsx'))
const ProfilePage = lazy(async () => import('../page/profile/ProfilePage.tsx'))
const NotFound = lazy(async () => import('../page/404/index.tsx'))
const Layout = lazy(async () => import('../components/Layout.tsx'))
const DeviceConsumer = lazy(async () => import('../Context/Consumer/DeviceConsumer.tsx'))
const ModelConsumer = lazy(async () => import('../Context/Consumer/ModelConsumer.tsx'))
const LocationConsumer = lazy(async () => import('../Context/Consumer/LocationConsumer.tsx'))
const Home = lazy(() => import('../page/home/Home.tsx'))
const Dashboard = lazy(() => import('../page/dashboard/Dashboard.tsx'))
const ListadoSitios = lazy(() => import('../page/ListadoSitios/ListadoSitios.tsx'))
const ListadoModelos = lazy(() => import('../page/ListadoModelos/ListadoModelos.tsx'))
const ListComputer = lazy(() => import('../page/ListWrapper/ListComputer/ListComputer.tsx'))
const ListMonitor = lazy(() => import('../page/ListWrapper/ListMonitor/ListMonitor.tsx'))
const ListFinantialPrinter = lazy(() => import('../page/ListWrapper/ListFinantialPrinterPrinter/ListFinantialPrinter.tsx'))
const ListPartAndPieces = lazy(() => import('../page/ListWrapper/ListPartAndPieces/ListPartsAndPieces.tsx'))
const ListPrinters = lazy(() => import('../page/ListWrapper/ListPrinters/ListPrinter.tsx'))
const CreateEmployeeForm = lazy(() => import('../page/FormEmployee/CreateEmployeeForm.tsx'))
const CreateDeviceForm = lazy(() => import('../page/FormDevice/CreateDeviceForm.tsx'))
const CreateBrandForm = lazy(() => import('../page/FormBrand/CreateBrandForm.tsx'))
const CreateModelForm = lazy(() => import('../page/FormModel/CreateModelForm.tsx'))
const CreateLocationForm = lazy(() => import('../page/FormLocation/CreateLocationForm.tsx'))
const CreateProcessorForm = lazy(() => import('../page/FormProcessor/CreateProcessorForm.tsx'))
const CreateSiteForm = lazy(() => import('../page/FormSite/CreateSiteForm.tsx'))
const UserManagement = lazy(() => import('../page/user-management/UserManagement.tsx'))
const RegisterPage = lazy(() => import('../page/user-management/register/RegisterPage.tsx'))
const ManagementProfile = lazy(() => import('../page/user-management/profile/ManagementProfile.tsx'))

export default function AppRoutes() {
  const { useAuth: { user } } = useAppContext()
  return (
    <Routes>
      <Route path='/login' element={<Suspense><Login user={user} /></Suspense>} />
      <Route
        path='/'
        element={<Suspense><ProtectedRoute user={user}><Layout /></ProtectedRoute></Suspense>}
      >
        <Route path='/' element={<Suspense fallback={<main className='flex-1' />}><Home /></Suspense>} />

        <Route path='/dashboard' element={<Suspense fallback={<main className='flex-1' />}><Dashboard /></Suspense>} />
        <Route path='/profile' element={<Suspense fallback={<main className='flex-1' />}><ProfilePage /></Suspense>} />
        <Route path='/employee/add' element={<Suspense fallback={<main className='flex-1' />}><CreateEmployeeForm /></Suspense>} />
        <Route path='/employee/edit/:id' element={<Suspense fallback={<main className='flex-1' />}><CreateEmployeeForm /></Suspense>} />
        <Route path='/brand/add' element={<Suspense fallback={<main className='flex-1' />}><CreateBrandForm /></Suspense>} />
        <Route path='/brand/edit/:id' element={<Suspense fallback={<main className='flex-1' />}><CreateBrandForm /></Suspense>} />

        <Route path='/processor/add' element={<Suspense fallback={<main className='flex-1' />}><CreateProcessorForm /></Suspense>} />
        <Route path='/processor/edit/:id' element={<Suspense fallback={<main className='flex-1' />}><CreateProcessorForm /></Suspense>} />

        <Route path='/site/add' element={<Suspense fallback={<main className='flex-1' />}><CreateSiteForm /></Suspense>} />
        <Route path='/site/edit/:id' element={<Suspense fallback={<main className='flex-1' />}><CreateSiteForm /></Suspense>} />

        {/* Rutas para el manejo de listados de ubicaciones  */}
        <Route path='/location' element={<Suspense fallback={<main className='flex-1' />}><LocationConsumer><ListadoSitios /></LocationConsumer></Suspense>} />
        <Route path='/location/add' element={<Suspense fallback={<main className='flex-1' />}><LocationConsumer><CreateLocationForm /></LocationConsumer></Suspense>} />
        <Route path='/location/edit/:id' element={<Suspense fallback={<main className='flex-1' />}><LocationConsumer><CreateLocationForm /></LocationConsumer></Suspense>} />

        {/* Rutas para el manejo de listados de modelos  */}
        <Route path='/model' element={<Suspense fallback={<main className='flex-1' />}><ModelConsumer><ListadoModelos /></ModelConsumer></Suspense>} />
        <Route path='/model/add' element={<Suspense fallback={<main className='flex-1' />}><ModelConsumer><CreateModelForm /></ModelConsumer></Suspense>} />
        <Route path='/model/edit/:id' element={<Suspense fallback={<main className='flex-1' />}><ModelConsumer><CreateModelForm /></ModelConsumer></Suspense>} />

        {/* Rutas para el manejo de listados de dispositivos  */}
        <Route path='/computer' element={<Suspense fallback={<main className='flex-1' />}><DeviceConsumer location='computer'><ListComputer /></DeviceConsumer></Suspense>} />
        <Route path='/monitor' element={<Suspense fallback={<main className='flex-1' />}><DeviceConsumer location='monitor'><ListMonitor /></DeviceConsumer></Suspense>} />
        <Route path='/finantialprinter' element={<Suspense fallback={<main className='flex-1' />}><DeviceConsumer location='finantialPrinter'><ListFinantialPrinter /></DeviceConsumer></Suspense>} />
        <Route path='/printer' element={<Suspense fallback={<main className='flex-1' />}><DeviceConsumer location='printer'><ListPrinters /></DeviceConsumer></Suspense>} />
        <Route path='/parts' element={<Suspense fallback={<main className='flex-1' />}><DeviceConsumer location='parts'><ListPartAndPieces /></DeviceConsumer></Suspense>} />
        <Route path='/device/add' element={<Suspense fallback={<main className='flex-1' />}><DeviceConsumer><CreateDeviceForm /></DeviceConsumer></Suspense>} />
        <Route path='/device/edit/:id' element={<Suspense fallback={<main className='flex-1' />}><DeviceConsumer><CreateDeviceForm /></DeviceConsumer></Suspense>} />

        {/* Rutas para la gestion de usuario */}
        <Route path='/user-management' element={<Suspense fallback={<main className='flex-1' />}><UserManagement /></Suspense>}>
          <Route path='register' element={<Suspense><RegisterPage /></Suspense>} />
          <Route path='edit/:id' element={<Suspense><RegisterPage /></Suspense>} />
          <Route path='profile/:id' element={<Suspense><ManagementProfile /></Suspense>} />
        </Route>
      </Route>
      <Route path='*' element={<Suspense><NotFound /></Suspense>} />
    </Routes>
  )
}
