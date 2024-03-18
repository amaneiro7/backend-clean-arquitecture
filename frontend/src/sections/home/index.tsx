import { useNavigate } from 'react-router-dom'
import { Suspense, lazy, useCallback } from 'react'
import { useAppContext } from '../Context/AppContext'
import { useInputsData } from './useInputData'
import debounce from 'just-debounce-it'
import { useDevice } from '../Device/device/useDevice'
import { type DevicesMappedApiResponse } from '../../modules/shared/domain/types/responseTypes'

const TableHeader = lazy(async () => await import('../components/TableHeader'))
const DeviceTableCard = lazy(async () => await import('../Device/device/DeviceTableCard'))
const TableStructure = lazy(async () => await import('../components/Table'))
const Button = lazy(async () => await import('../ui/button'))
const BrandSelect = lazy(async () => await import('../Device/brand/BrandSelect'))
const CategorySelect = lazy(async () => await import('../Device/category/CategorySelect'))
const SerialInput = lazy(async () => await import('../Device/device/SerialInput'))
const ActivoInput = lazy(async () => await import('../Device/device/ActivoInput'))
const ModelSelect = lazy(async () => await import('../Device/model/ModelSelect'))
const StatusSelect = lazy(async () => await import('../Device/status/StatusSelect'))

function Home () {
  const { repository } = useAppContext()
  const { devices, handleHasUrlSearch } = useDevice(repository)
  const navigate = useNavigate()

  const { inputData, updateInputData, clearInputs } = useInputsData()

  const debounceGetdevices = useCallback(
    debounce(() => {
      handleHasUrlSearch()
    }, 300),
    [handleHasUrlSearch]
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    updateInputData(name, value)
    debounceGetdevices()
  }

  const handleClear = () => {
    clearInputs()
    debounceGetdevices()
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
        <Suspense>
        </Suspense>
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
        <Suspense>
        </Suspense>
          <SerialInput
            value={inputData.serial}
            onChange={handleChange}
          />
        <Suspense>
        </Suspense>
          <ActivoInput
            value={inputData.activo}
            onChange={handleChange}
          />
        <Suspense>
        </Suspense>
          <ModelSelect
            value={inputData.modelId}
            brandId={inputData.brandId}
            categoryId={inputData.categoryId}
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
          <TableHeader headerTitle={['Categoria', 'Serial', 'Activo', 'Status', 'Marca', 'Modelo', 'Ubicación', 'Observaciones']}/>
          <DeviceTableCard device={devices as DevicesMappedApiResponse[]}/>
        </TableStructure>
      </Suspense>
    </main>
  )
}

export default Home
