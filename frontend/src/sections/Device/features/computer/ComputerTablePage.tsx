import { Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../../Context/AppContext'
import { useComputer } from './useComputer'
import TableStructure from '../../../components/Table'
import ComputerTableCard from './ComputerTableCard'
import { type ComputerAPIResponse } from '../../../../modules/devices/fetures/computer/infrastructure/ComputerApiResponse'

export default function ComputerPage () {
  const { repository } = useAppContext()
  const { computer } = useComputer(repository)
  const navigate = useNavigate()

  const TableHeader = lazy(async () => await import('../../../components/TableHeader'))

  return (
        <main className='max-w-full h-full flex flex-col gap-5 p-5'>
            <div>
                <h1 className='text-lg text-primary font-bold'>InventarioAPP</h1>
            </div>
            <Suspense>
                <TableStructure>
                    <TableHeader headerTitle={['Serial', 'Activo', 'Marca', 'Modelo', 'Categoria', 'Sistema Operativo', 'Arquitectura', 'Memoria Ram (MB)', 'Disco Duro (GB)', 'Tipo de Disco', 'Procesador', 'IP', 'MAC']}/>
                    <ComputerTableCard computer={computer as ComputerAPIResponse[]}/>
                </TableStructure>
            </Suspense>
        </main>
  )
}
