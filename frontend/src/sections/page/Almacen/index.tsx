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

const TableHeader = lazy(async () => await import('../../components/TableHeader'))
const DeviceTableCard = lazy(async () => await import('../../Device/device/DeviceTableCard'))
const TableStructure = lazy(async () => await import('../../components/Table'))
const Button = lazy(async () => await import('../../ui/button'))
const TabsComponent = lazy(async () => await import('../../ui/tabs'))
const BrandSelect = lazy(async () => await import('../../Device/brand/BrandSelect'))
const SerialInput = lazy(async () => await import('../../Device/device/SerialInput'))
const ActivoInput = lazy(async () => await import('../../Device/device/ActivoInput'))
const ModelSelect = lazy(async () => await import('../../Device/model/ModelSelect'))
const StatusSelect = lazy(async () => await import('../../Device/status/StatusSelect'))
const LocationSelect = lazy(async () => await import('../../Device/location/LocationSelect'))

export default function AlmacenPage () {
  const { device: { devices }, addFilter, cleanFilters } = useAppContext()
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
        value: '3'
      }]
    })
  }, [])

  const handleClear = () => {
    clearInputs()
    cleanFilters({
      filters: []
    })
  }

  const defaultHeaderTitle = ['Categoria', 'Serial', 'Activo', 'Status', 'Marca', 'Modelo', 'Ubicación', 'Observaciones']
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
      <div>
        <h1 className='text-lg text-primary font-bold'>InventarioAPP</h1>
      </div>
      <Suspense>
        <Button
          type='button'
          text='Agregar un nuevo item'
          actionType='ACTION'
          handle={() => { navigate('/device/add') }}
        />
      </Suspense>
        <Suspense>
          <TabsComponent
            value={inputData.categoryId}
            onChange={handleChange}
          />
        </Suspense>
      <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
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
            typeOfSiteId={'3'}
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
      <Suspense>
        <TableStructure>
          <TableHeader headerTitle={headerTitle}/>
          <DeviceTableCard category={inputData.categoryId} device={devices as unknown as DevicesMappedApiResponse[]}/>
        </TableStructure>
      </Suspense>
    </main>
  )
}
