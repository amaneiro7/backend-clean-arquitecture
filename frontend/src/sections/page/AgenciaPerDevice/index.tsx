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
import PageTitle from '../../components/PageTitle'
import Table from '../../components/TableComponent/Table'
import { TableRow } from '@mui/material'
import TableBody from '../../components/TableComponent/TableBody'
import TableHead from '../../components/TableComponent/TableHead'
import TableCell from '../../components/TableComponent/TableCell'
import TableHeader from '../../components/TableComponent/TableHeader'
import TableCellEditDeleteIcon from '../../components/TableComponent/TableCellEditDeleteIcon'
import { useDevice } from '../../Device/device/useDevice'
import Main from '../../components/Main'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { SpinnerSKCircle } from '../../components/Loading/spinner-sk-circle'

const Button = lazy(async () => await import('../../ui/button'))
const SerialInput = lazy(async () => await import('../../components/text-inputs/SerialInput'))
const ActivoInput = lazy(async () => await import('../../components/text-inputs/ActivoInput'))
const BrandComboBox = lazy(async () => await import('../../components/combo_box/BrandComboBox'))
const EmployeeComboBox = lazy(async () => await import('../../components/combo_box/EmployeeComboBox'))
const CategoryComboBox = lazy(async () => await import('../../components/combo_box/CategoryComboBox'))
const LocationComboBox = lazy(async () => await import('../../components/combo_box/LocationComboBox'))
const ModelComboBox = lazy(async () => await import('../../components/combo_box/ModelComboBox'))

export default function AgenciaPage () {
  const { repository } = useAppContext()
  const { devices, loading, addFilter, cleanFilters } = useDevice(repository, {
    filters: [{
      field: 'typeOfSite',
      operator: Operator.EQUAL,
      value: '2'
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
        field: 'typeOfSite',
        operator: Operator.EQUAL,
        value: '2'
      }]
    })
  }

  const defaultHeaderTitle = ['Acciones', 'Usuario', 'Ubicación', 'Categoria', 'Serial', 'Activo', 'Status', 'Marca', 'Modelo', 'Observaciones']
  let headerTitle: string[]
  if (Computer.isComputerCategory({ categoryId: inputData.categoryId })) {
    const headerTitleComputer = ['Procesador', 'Memoria Ram', 'Disco Duro', 'Tipo']
    headerTitle = defaultHeaderTitle.concat(headerTitleComputer)
  } else if (HardDrive.isHardDriveCategory({ categoryId: inputData.categoryId })) {
    const headerTitleHardDrive = ['Capacidad', 'Tipo', 'Estado de salud']
    headerTitle = defaultHeaderTitle.concat(headerTitleHardDrive)
  } else {
    headerTitle = defaultHeaderTitle
  }

  return (
    <Main>
      <PageTitle title='Equipos de Agencia' />
      <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
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
            typeOfSiteId={'1'} // Modificarlo para que no sea un magic string
            statusId={StatusId.StatusOptions.INUSE} // Modificarlo para que no sea un magic string
            onChange={handleChange}
            type='search'
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
          <Button
            actionType='CANCEL'
            type='button'
            text='Limpiar'
            handle={handleClear}
          />
        </Suspense>
        <Suspense fallback={<InputSkeletonLoading />}>
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
                <TableHead key={index} name={title} />
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
              {(devices as unknown as DevicesMappedApiResponse[]).map((device) => (
                <TableRow key={device?.id}>
                  <TableCellEditDeleteIcon state={device} url={`/device/edit/${device.id}`} />
                  <TableCell value={device.employeeUserName}/>
                  <TableCell value={device.locationName}/>
                  <TableCell value={device.categoryName}/>
                  <TableCell value={device.serial}/>
                  <TableCell value={device.activo}/>
                  <TableCell value={device.brandName}/>
                  <TableCell value={device.modelName}/>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Suspense>}
    </Main>
  )
}
