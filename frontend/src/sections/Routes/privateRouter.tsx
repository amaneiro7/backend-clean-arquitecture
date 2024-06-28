/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'

const Home = lazy(() => import('../page/home/Home.tsx'))
const ListadoSitios = lazy(() => import('../page/ListadoSitios/ListadoSitios.tsx'))
const ListadoModelos = lazy(() => import('../page/ListadoModelos/ListadoModelos.tsx'))
const FilterByDevice = lazy(() => import('../page/FiltroPorDevice'))
const AlmacenPage = lazy(() => import('../page/Almacen/index.tsx'))
const EquiposAgenciaPage = lazy(() => import('../page/AgenciaPerDevice/index.tsx'))
const EquiposTorrePage = lazy(() => import('../page/AdministrativeSitePerDevice/index.tsx'))
const AdministrativeSitePerEmployee = lazy(() => import('../page/AdministrativeSitePerEmployee/index.tsx'))
const AgencySitePerEmployee = lazy(() => import('../page/AgenciaPerEmployee/index.tsx'))
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
    { path: '/devicefilter', element: <FilterByDevice /> },
    { path: '/device', element: <DeviceList /> },
    { path: '/monitor', element: <ListMonitor /> },
    { path: '/finantialprinter', element: <ListFinantialPrinter /> },
    { path: '/printer', element: <ListPrinters /> },
    { path: '/parts', element: <ListPartAndPieces /> },
  ]
  