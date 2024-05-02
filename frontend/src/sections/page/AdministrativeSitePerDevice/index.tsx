import { Suspense, lazy, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'

import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'

import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { useDevice } from '../../Device/device/useDevice'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'

import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'

const HeaderInput = lazy(async () => import('../../components/HeaderInput').then(m => ({ default: m.HeaderInput })))
const DownloadTable = lazy(async () => import('../../components/button/DownloadTableExcel').then(m => ({ default: m.DownloadTable })))
const Main = lazy(async () => import('../../components/Main'))
const PageTitle = lazy(async () => import('../../components/PageTitle'))
const Table = lazy(async () => import('../../components/TableComponent/Table'))
const TableHeader = lazy(async () => import('../../components/TableComponent/TableHeader'))
const TableRow = lazy(async () => import('../../components/TableComponent/TableRow'))
const TableBody = lazy(async () => import('../../components/TableComponent/TableBody'))
const TableHead = lazy(async () => import('../../components/TableComponent/TableHead'))
const TableCell = lazy(async () => import('../../components/TableComponent/TableCell'))
const TableCellEditDeleteIcon = lazy(async () => import('../../components/TableComponent/TableCellEditDeleteIcon'))
const Button = lazy(async () => await import('../../ui/button'))
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
      field: 'typeOfSite',
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
        field: 'typeOfSite',
        operator: Operator.EQUAL,
        value: TypeOfSiteId.SitesOptions.ADMINISTRATIVE
      }]
    })
  }

  const defaultHeaderTitle = ['Acciones', 'Usuario', 'Ubicación', 'Categoria', 'Serial', 'Activo', 'Marca', 'Modelo', 'Observaciones']
  const isComputerFilter = Computer.isComputerCategory({ categoryId: inputData.categoryId })
  const headerTitle: string[] = isComputerFilter
    ? defaultHeaderTitle.concat(['Nombre de Equipo', 'Procesador', 'Memoria Ram', 'Disco Duro', 'Tipo', 'Sistema Operativo', 'Arquitectura', 'Dirección IP'])
    : defaultHeaderTitle

  return (
    <Suspense>
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
                typeOfSiteId={TypeOfSiteId.SitesOptions.ADMINISTRATIVE} // Modificarlo para que no sea un magic string
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
              <DownloadTable ref={tableRef} />
            </Suspense>
          </HeaderInput>
        </Suspense>
        {loading && <SpinnerSKCircle />}
        {(!loading && devices.length === 0) && <p>No hay resultados</p>}
        {(!loading && devices.length > 0) && <Suspense fallback={<p>...Loading</p>}>
          <Table ref={tableRef} className=''>
            <TableHeader>
              <TableRow>
                {headerTitle.map((title, index) => (
                  <TableHead key={index} name={title} />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(devices as unknown as DevicesMappedApiResponse[]).map((device) => (
                <TableRow key={device?.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.employeeUserName} />
                  <TableCell value={device.locationName} />
                  <TableCell value={device.categoryName} />
                  <TableCell value={device.serial} />
                  <TableCell value={device.activo} />
                  <TableCell value={device.brandName} />
                  <TableCell value={device.modelName} />
                  <TableCell value={device.observation} />
                  {isComputerFilter &&
                    <>
                      <TableCell value={device?.computer?.computerName} />
                      <TableCell value={device?.computer?.processor?.numberModel} />
                      <TableCell value={device?.computer?.memoryRamCapacity} />
                      <TableCell value={device?.computer?.hardDriveCapacity?.name} />
                      <TableCell value={device?.computer?.hardDriveType?.name} />
                      <TableCell value={device?.computer?.operatingSystem?.name} />
                      <TableCell value={device?.computer?.operatingSystemArq?.name} />                      
                      <TableCell value={device?.computer?.ipAddress} />
                    </>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Suspense>}
      </Main>
    </Suspense>
  )
}
