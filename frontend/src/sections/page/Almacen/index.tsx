import { Suspense, lazy, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import debounce from 'just-debounce-it'
import { type SearchByCriteriaQuery } from '../../../modules/shared/infraestructure/criteria/SearchByCriteriaQuery'
import { HardDrive } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDrive'
import Table from '../../components/TableComponent/Table'
import TableHeader from '../../components/TableComponent/TableHeader'
import TableBody from '../../components/TableComponent/TableBody'
import TableRow from '../../components/TableComponent/TableRow'
import TableHead from '../../components/TableComponent/TableHead'
import TableCell from '../../components/TableComponent/TableCell'
import PageTitle from '../../components/PageTitle'
import TableCellEditDeleteIcon from '../../components/TableComponent/TableCellEditDeleteIcon'
import { useDevice } from '../../Device/device/useDevice'
import Main from '../../components/Main'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'


const Button = lazy(async () => await import('../../ui/button'))
const StatusSelect = lazy(async () => await import('../../components/Select/StatusSelect'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function AlmacenPage () {
  const { repository } = useAppContext()
  const { devices, loading, addFilter, cleanFilters } = useDevice(repository, {
    filters: [{
      field: 'typeOfSite',
      operator: Operator.EQUAL,
      value: '3'
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
      filters: []
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
    <Main>
      <PageTitle title='Inventario de Equipos en el almacén' />
      <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
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
          <StatusSelect
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
            typeOfSiteId={'1'} // Modificarlo para que no sea un magic string
            statusId={StatusId.StatusOptions.INUSE} // Modificarlo para que no sea un magic string
            onChange={handleChange}
            type='search'
          />
        </Suspense>
        <Suspense>
          <Button
            actionType='CANCEL'
            type='button'
            text='Limpiar'
            handle={handleClear}
          />
        </Suspense>
        <Suspense>
        <Button
          type='button'
          text='Agregar un nuevo item'
          actionType='ACTION'
          handle={() => { navigate('/device/add') }}
        />
      </Suspense>
      </header>
      {loading && <SpinnerSKCircle/>}
      {(!loading && devices.length === 0) && <p>No hay resultados</p>}
      {(!loading && devices.length > 0) && <Suspense fallback={<p>...Loading</p>}>
        <Table className=''>
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
  )
}
