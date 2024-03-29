import React, { Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../Context/AppContext'
import { useInputsData } from './useInputData'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'
import { useDebounceGetdevices } from '../../Hooks/useDebounceGetDevices'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

const TableHeader = lazy(async () => await import('../../components/TableHeader'))
const DeviceTableCard = lazy(async () => await import('../../Device/device/DeviceTableCard'))
const TableStructure = lazy(async () => await import('../../components/Table'))
const Button = lazy(async () => await import('../../ui/button'))
const BrandSelect = lazy(async () => await import('../../Device/brand/BrandSelect'))
const CategorySelect = lazy(async () => await import('../../Device/category/CategorySelect'))
const SerialInput = lazy(async () => await import('../../Device/device/SerialInput'))
const ActivoInput = lazy(async () => await import('../../Device/device/ActivoInput'))
const ModelSelect = lazy(async () => await import('../../Device/model/ModelSelect'))
const StatusSelect = lazy(async () => await import('../../Device/status/StatusSelect'))
const LocationSelect = lazy(async () => await import('../../Device/location/LocationSelect'))

function Home () {
  const { device: { devices, handleHasUrlSearch, handleQuery } } = useAppContext()
  const navigate = useNavigate()

  const { inputData, updateInputData, clearInputs } = useInputsData()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, operator?: Operator) => {
    const { name, value } = event.target
    const filters = [{
      field: name,
      operator: operator ?? Operator.EQUAL,
      value
    }]
    updateInputData(name, value)
    handleQuery({ filters })
    useDebounceGetdevices(handleHasUrlSearch)
  }

  const handleClear = () => {
    clearInputs()
    useDebounceGetdevices(handleHasUrlSearch)
  }

  const defaultHeaderTitle = ['Categoria', 'Serial', 'Activo', 'Status', 'Marca', 'Modelo', 'Ubicación', 'Observaciones']
  const headerTitleComputer = ['Nombre', 'Procesador', 'Memoria Ram', 'Disco Duro', 'Tipo', 'Sistema Operativo', 'Arquitectura', 'Diracción MAC', 'Dirección IP']
  let headerTitle
  if (Computer.isComputerCategory({ categoryId: inputData.categoryId })) {
    headerTitle = defaultHeaderTitle.concat(headerTitleComputer)
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
      <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
        <Suspense>
          <CategorySelect
            value={inputData.categoryId}
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
            value={inputData.modelId}
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
      {/* <TabsComponent
        value={inputData.categoryId}
        onChange={updateInputData}
      /> */}
      <Suspense>
        <TableStructure>
          <TableHeader headerTitle={headerTitle}/>
          <DeviceTableCard category={inputData.categoryId} device={devices as unknown as DevicesMappedApiResponse[]}/>
        </TableStructure>
      </Suspense>
    </main>
  )
}

export default Home
