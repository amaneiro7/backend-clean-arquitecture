import { Suspense, lazy, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'

import { type DevicesApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { useDevice } from '../../Device/device/useDevice'
// import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'

import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'
import TableSkeleton from '../../components/skeleton/TableSkeleton'
import { MainFallback } from '../../components/skeleton/MainFallback'

const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const Table = lazy(async () => import('../../components/TableComponent/Table'))
const TableHeader = lazy(async () => import('../../components/TableComponent/TableHeader'))
const TableRow = lazy(async () => import('../../components/TableComponent/TableRow'))
const TableBody = lazy(async () => import('../../components/TableComponent/TableBody'))
const TableHead = lazy(async () => import('../../components/TableComponent/TableHead'))
const TableCell = lazy(async () => import('../../components/TableComponent/TableCell'))
const TableCellEditDeleteIcon = lazy(async () => import('../../components/TableComponent/TableCellEditDeleteIcon'))
const Button = lazy(async () => await import('../../components/button'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))


export default function AdministrativeSitePage() {
  const tableRef = useRef(null)
  const { repository } = useAppContext()
  const { devices, loading, addFilter, cleanFilters } = useDevice(repository, {
    filters: [{
      field: 'typeOfSiteId',
      operator: Operator.EQUAL,
      value: TypeOfSiteId.SitesOptions.ADMINISTRATIVE
    }]
  })
  const navigate = useNavigate()
  const { inputData, updateInputData, clearInputs } = useInputsData()

  const debounceGetDevices = useCallback(
    debounce((query: SearchByCriteriaQuery) => {
      addFilter(query)
    }, 300)
    , [addFilter]
  )

  const handleChange = (name: string, value: string, operator?: Operator) => {
    const filters = [{
      field: name,
      operator: operator ?? Operator.EQUAL,
      value
    }]
    updateInputData({ name, value })
    debounceGetDevices({ filters })
  }

  const handleClear = () => {
    clearInputs()
    // Modificarlo para que no sea un magic string
    cleanFilters({
      filters: [{
        field: 'typeOfSiteId',
        operator: Operator.EQUAL,
        value: TypeOfSiteId.SitesOptions.ADMINISTRATIVE
      }]
    })
  }

  return (
    <Suspense fallback={<MainFallback />}>
      <Main>
        <Suspense>
          <PageTitle title='Equipos de Torre' />
        </Suspense>
        <Suspense>
          <HeaderInput>
            <Suspense fallback={<InputSkeletonLoading />}>
              <EmployeeComboBox
                name='employeeId'
                value={inputData.employeeId}
                onChange={handleChange}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <CategoryComboBox
                value={inputData.categoryId}
                onChange={handleChange}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <BrandComboBox
                value={inputData.brandId}
                categoryId={inputData.categoryId}
                onChange={handleChange}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <SerialInput
                value={inputData.serial}
                onChange={handleChange}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <ActivoInput
                value={inputData.activo}
                onChange={handleChange}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <ModelComboBox
                value={inputData.modelId}
                brandId={inputData.brandId}
                categoryId={inputData.categoryId}
                onChange={handleChange}
                type='search'
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <LocationComboBox
                value={inputData.locationId}
                typeOfSiteId={TypeOfSiteId.SitesOptions.ADMINISTRATIVE}
                statusId={StatusId.StatusOptions.INUSE}
                onChange={handleChange}
                type='search'
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <Button
                type='button'
                text='Añadir'
                actionType='ACTION'
                handle={() => { navigate('/device/add') }}
              />
            </Suspense>
            <Suspense fallback={<InputSkeletonLoading />}>
              <Button
                actionType='CLOSE'
                type='button'
                text='Limpiar'
                handle={handleClear}
              />
            </Suspense>
            <Suspense>
              <Button
                type='button'
                actionType='SAVE'
                text='Export Excel'
                handle={() => { import('../../components/button/DownloadTableExcel').then(m => m.exportToExcel(tableRef)) }}
              />
            </Suspense>
          </HeaderInput>
        </Suspense>
        {loading && <SpinnerSKCircle />}
        {(!loading && devices.length === 0) && <p>No hay resultados</p>}        
        {(!loading && devices.length > 0) && <Suspense fallback={<TableSkeleton />}>
          <Table ref={tableRef} className=''>
            <TableHeader>
              <TableRow>
                <TableHead name='Acciones' />
                <TableHead name='Usuario' />
                <TableHead name='Ubicación' />
                <TableHead name='Categoria' />
                <TableHead name='Serial' />
                <TableHead name='Activo' />
                <TableHead name='Marca' />
                <TableHead name='Modelo' />
                <TableHead name='Observaciones' />
                <TableHead name='Nombre de Equipo' />
                <TableHead name='Procesador' />
                <TableHead name='Memoria Ram' />
                <TableHead name='Disco Duro' />
                <TableHead name='Tipo' />
                <TableHead name='Sistema Operativo' />
                <TableHead name='Arquitectura' />
                <TableHead name='Dirección IP' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {(devices as unknown as DevicesApiResponse[]).map((device) => (
                <TableRow key={device?.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.employee?.userName} url={`/employee/edit/${device.employeeId}`} />
                  <TableCell value={device.location?.name} />
                  <TableCell value={device.category?.name} />
                  <TableCell value={device.serial ?? 'Sin Serial'} state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.activo ?? 'Sin Activo'} />
                  <TableCell value={device.brand?.name} />
                  <TableCell value={device.model?.name} />
                  <TableCell value={device.observation} />
                  <TableCell value={device?.computer?.computerName} />
                  <TableCell value={device?.computer ? `${device?.computer?.processor?.productCollection} ${device?.computer?.processor?.numberModel}` : ''} />
                  <TableCell value={device?.computer ? `${device?.computer?.memoryRamCapacity} Gb` : ''} />
                  <TableCell value={device?.computer ? `${device?.computer?.hardDriveCapacity?.name} Gb` : ''} />
                  <TableCell value={device?.computer?.hardDriveType?.name} />
                  <TableCell value={device?.computer?.operatingSystem?.name} />
                  <TableCell value={device?.computer?.operatingSystemArq?.name} />
                  <TableCell value={device?.computer?.ipAddress} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Suspense>}
      </Main>
    </Suspense>
  )
}
