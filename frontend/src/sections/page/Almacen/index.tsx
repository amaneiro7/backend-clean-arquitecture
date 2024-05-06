import { Suspense, lazy, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from 'just-debounce-it'

import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { HardDrive } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import { useDevice } from '../../Device/device/useDevice'

import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'

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
const Button = lazy(async () => await import('../../components/button'))
const StatusComboBox = lazy(async () => await import('../../components/combo_box/StatusComboBox'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function AlmacenPage() {
  const { repository } = useAppContext()
  const tableRef = useRef(null)
  const { devices, loading, addFilter, cleanFilters } = useDevice(repository, {
    filters: [{
      field: 'typeOfSiteId',
      operator: Operator.EQUAL,
      value: TypeOfSiteId.SitesOptions.ALMACEN
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
    cleanFilters({
      filters: [{
        field: 'typeOfSiteId',
        operator: Operator.EQUAL,
        value: TypeOfSiteId.SitesOptions.ALMACEN
      }]
    })
  }

  const defaultHeaderTitle = ['Acciones', 'Categoria', 'Serial', 'Activo', 'Status', 'Marca', 'Modelo', 'Ubicación', 'Observaciones']
  const isComputerFilter = Computer.isComputerCategory({ categoryId: inputData.categoryId })
  const isHardDriveFilter = HardDrive.isHardDriveCategory({ categoryId: inputData.categoryId })
  const headerTitle: string[] = isComputerFilter
    ? defaultHeaderTitle.concat(['Procesador', 'Memoria Ram', 'Disco Duro', 'Tipo'])
    : isHardDriveFilter
      ? defaultHeaderTitle.concat(['Capacidad', 'Tipo', 'Estado de salud'])
      : defaultHeaderTitle

  return (
    <Suspense>
      <Main>
        <Suspense>
          <PageTitle title='Inventario de Equipos en el almacén' />
        </Suspense>
        <Suspense>
          <HeaderInput>
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
            <Suspense>
              <StatusComboBox
                value={inputData.statusId}
                onChange={handleChange}
              />
            </Suspense>
            <Suspense>
              <SerialInput
                value={inputData.serial}
                onChange={handleChange}
              />
            </Suspense>
            <Suspense>
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
                typeOfSiteId={TypeOfSiteId.SitesOptions.ALMACEN} // Modificarlo para que no sea un magic string
                // statusId={StatusId.StatusOptions.INUSE}
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
                  <TableHead key={`heade-${index}`} name={title} />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {(devices as unknown as DevicesMappedApiResponse[]).map((device) => (
                <TableRow key={device.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.categoryName} />
                  <TableCell value={device.serial} />
                  <TableCell value={device.activo} />
                  <TableCell value={device.statusName} />
                  <TableCell value={device.brandName} />
                  <TableCell value={device.modelName} />
                  <TableCell value={device.locationName} />
                  <TableCell value={device.observation} />
                  {
                    isHardDriveFilter &&
                    <>
                      <TableCell value={device?.hardDrive?.hardDriveCapacity?.name} />
                      <TableCell value={device?.hardDrive?.hardDriveType?.name} />
                      <TableCell value={device?.hardDrive?.health} />
                    </>
                  }
                  {
                    isComputerFilter &&
                    <>
                      <TableCell value={device?.computer?.processor?.numberModel} />
                      <TableCell value={device?.computer?.memoryRamCapacity} />
                      <TableCell value={device?.computer?.hardDriveCapacity?.name} />
                      <TableCell value={device?.computer?.hardDriveType?.name} />
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
