import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext.tsx'

const ProtectedRoute = lazy(async () => import('./ProtectedRoute.tsx').then(m => ({ default: m.ProtectedRoute })))
const Login = lazy(async () => import('../page/login/LoginPage.tsx'))
const ProfilePage = lazy(async () => import('../page/profile/ProfilePage.tsx'))
const NotFound = lazy(async () => import('../page/404/index.tsx'))
const Layout = lazy(async () => import('../components/Layout.tsx'))
const DeviceConsumer = lazy(async () => import('../components/DeviceConsumer.tsx'))
const Home = lazy(() => import('../page/home/Home.tsx'))
const ListadoSitios = lazy(() => import('../page/ListadoSitios/ListadoSitios.tsx'))
const ListadoModelos = lazy(() => import('../page/ListadoModelos/ListadoModelos.tsx'))
const DeviceList = lazy(() => import('../page/DeviceList'))
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
const UserManagement = lazy(() => import('../page/user-management/UserManagement.tsx'))
const RegisterPage = lazy(() => import('../page/user-management/register/RegisterPage.tsx'))
const ManagementProfile = lazy(() => import('../page/user-management/profile/ManagementProfile.tsx'))

export default function AppRoutes() {
  const { useAuth: { user } } = useAppContext()
  return (
    <Routes>
      <Route path='/login' element={<Login user={user} />} />
      <Route 
        path='/' 
        element={<ProtectedRoute user={user}><Layout /></ProtectedRoute>}
      >
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/location' element={<ListadoSitios />} />
        <Route path='/location/add' element={<CreateLocationForm />} />
        <Route path='/location/edit/:id' element={<CreateLocationForm />} />  
        <Route path='/employee/add' element={<CreateEmployeeForm />} />
        <Route path='/employee/edit/:id' element={<CreateEmployeeForm />} />
        <Route path='/brand/add' element={<CreateBrandForm />} />
        <Route path='/brand/edit/:id' element={<CreateBrandForm />} />
        <Route path='/model' element={<ListadoModelos />} />
        <Route path='/model/add' element={<CreateModelForm />} />
        <Route path='/model/edit/:id' element={<CreateModelForm />} />
        <Route path='/processor/add' element={<CreateProcessorForm />} />
        <Route path='/processor/edit/:id' element={<CreateProcessorForm />} />        
        {/* Rutas para el manejo de listados de dispositivos  */}
                      
        <Route path='/computer' element={<DeviceConsumer location='computer'><DeviceList /></DeviceConsumer>} />
        <Route path='/device/add' element={<DeviceConsumer><CreateDeviceForm /></DeviceConsumer>} />
        <Route path='/device/edit/:id' element={<DeviceConsumer><CreateDeviceForm /></DeviceConsumer>} />
        <Route path='/monitor' element={<DeviceConsumer><ListMonitor /></DeviceConsumer>} />
        <Route path='/finantialprinter' element={<DeviceConsumer><ListFinantialPrinter /></DeviceConsumer>} />
        <Route path='/printer' element={<DeviceConsumer><ListPrinters /></DeviceConsumer>} />
        <Route path='/parts' element={<DeviceConsumer><ListPartAndPieces /></DeviceConsumer>} />
        
        {/* Rutas para la gestion de usuario */}
        <Route path='/user-management' element={<UserManagement />}>
          <Route path='register' element={<RegisterPage />} />        
          <Route path='edit/:id' element={<RegisterPage />} />
          <Route path='profile/:id' element={<ManagementProfile />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
