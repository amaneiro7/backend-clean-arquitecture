import { Suspense, lazy, useCallback, useEffect } from 'react'
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

const Button = lazy(async () => await import('../../ui/button'))
const BrandSelect = lazy(async () => await import('../../Device/brand/BrandSelect'))
const CategorySelect = lazy(async () => await import('../../Device/category/CategorySelect'))
const SerialInput = lazy(async () => await import('../../Device/device/components/SerialInput'))
const ActivoInput = lazy(async () => await import('../../Device/device/components/ActivoInput'))
const ModelSelect = lazy(async () => await import('../../Device/model/ModelSelect'))
const StatusSelect = lazy(async () => await import('../../Device/status/StatusSelect'))
const LocationSelect = lazy(async () => await import('../../Device/location/LocationSelect'))

export default function AgenciaPage () {
  const { device: { devices, loading, addFilter, cleanFilters } } = useAppContext()
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

  useEffect(() => {
    cleanFilters({
      filters: [{
        field: 'typeOfSite',
        operator: Operator.EQUAL,
        value: '2'
      }]
    })
  }, [])

  const handleClear = () => {
    clearInputs()
    cleanFilters({
      filters: []
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
    <main className='max-w-full h-full flex flex-col gap-5 p-5'>
      <PageTitle title='Equipos de Agencia' />
      <Suspense>
        <Button
          type='button'
          text='Agregar un nuevo item'
          actionType='ACTION'
          handle={() => { navigate('/device/add') }}
        />
      </Suspense>
      <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
        <Suspense>
          <CategorySelect
            value={inputData.brandId}
            onChange={handleChange}
          />
        </Suspense>
        <Suspense>
          <BrandSelect
            value={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
            isForm={false}
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
        <Suspense>
          <ModelSelect
            value={inputData.modelId}
            brandId={inputData.brandId}
            categoryId={inputData.categoryId}
            onChange={handleChange}
            isForm={false}
          />
        </Suspense>
        <Suspense>
          <LocationSelect
            value={inputData.locationId}
            typeOfSiteId={'2'}
            statusId={inputData.statusId}
            onChange={handleChange}
            isForm={false}
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
      </header>
      {loading && <p>...Loading</p>}
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
    </main>
  )
}
