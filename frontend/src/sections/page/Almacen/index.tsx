import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import TableStructure from '../../components/Table'
import TableHeader from '../../components/TableHeader'
import { useAppContext } from '../../Context/AppContext'
import DeviceTableCard from '../../Device/device/DeviceTableCard'

function AlmacenPage () {
  const { device: { devices, handleHasUrlSearch } } = useAppContext()

  return (
        <main className='max-w-full h-full flex flex-col gap-5 p-5'>
            <div>
                <h1 className='text-lg text-primary font-bold'>Equipos en Almacen</h1>
            </div>
            <header className="grid grid-cols-[repeat(auto-fit,_250px)] gap-5 place-content-center">
                <TableStructure>
                    <TableHeader headerTitle={['Categoria', 'Serial', 'Activo', 'Status', 'Marca', 'Modelo', 'Ubicación', 'Observaciones']}/>
                    <DeviceTableCard device={devices as DevicesMappedApiResponse[]}/>
                </TableStructure>
            </header>
        </main>
  )
}

export default AlmacenPage
