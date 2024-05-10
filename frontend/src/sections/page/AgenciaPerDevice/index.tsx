import { Suspense, lazy, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'

import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useDevice } from '../../Device/device/useDevice'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'

import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'
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
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function AgenciaPage() {
  const tableRef = useRef(null)
  const { inputData, updateInputData, clearInputs } = useInputsData()
  const { repository } = useAppContext()
  const { devices, loading, addFilter, cleanFilters } = useDevice(repository, {
    filters: [{
      field: 'typeOfSiteId',
      operator: Operator.EQUAL,
      value: TypeOfSiteId.SitesOptions.AGENCY
    }]
  })
  const navigate = useNavigate()

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
    debounceGetDevices({ filters })
    updateInputData({ name, value })
  }

  const handleClear = () => {
    clearInputs()
    cleanFilters({
      filters: [{
        field: 'typeOfSiteId',
        operator: Operator.EQUAL,
        value: TypeOfSiteId.SitesOptions.AGENCY
      }]
    })
  }

  return (
    <Suspense fallback={<MainFallback />}>
      <Main>
        <Suspense>
          <PageTitle title='Equipos de Agencia' />
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
                typeOfSiteId={TypeOfSiteId.SitesOptions.AGENCY} // Modificarlo para que no sea un magic string
                statusId={StatusId.StatusOptions.INUSE} // Modificarlo para que no sea un magic string
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
          <Table className=''>
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
              {(devices as unknown as DevicesMappedApiResponse[]).map((device) => (
                <TableRow key={device?.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.employeeUserName} url={`/employee/edit/${device.employeeId}`} />
                  <TableCell value={device.locationName} />
                  <TableCell value={device.categoryName} />
                  <TableCell value={device.serial ?? 'Sin Serial'} state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.activo ?? 'Sin Activo'} />
                  <TableCell value={device.brandName} />
                  <TableCell value={device.modelName} />
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
