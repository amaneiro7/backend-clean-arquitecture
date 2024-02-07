import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { TableCardList } from '../TablerCardList'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
  device: DevicePrimitives[]
}
const TableCard: React.FC<Props> = ({ device }) => {
  // const [parent] = useAutoAnimate(/* optional config */)

  return (
    <div className='rounded-2xl p-6 m-4 border-2 border-solid shadow-md text-left'>
        <div className='overflow-x-auto overflow-y-auto pb-2'>
          <table className='w-full border-collapse table-fixed'>
            <thead className='sticky'>
              <tr className='rounded-2xl bg-slate-300 [&>th]:p-3 [&>th]:pb-2 [&>th]:text-sm [&>th]:w-fit [&>th]:whitespace-nowrap [&>th]:capitalize'>
                <th className='sticky z-10 top-0 left-0'>Categoria</th>
                <th>Serial</th>
                <th>Activo</th>
                <th>status</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th className='sticky z-10 top-0 left-0'>Acciones</th>
              </tr>
            </thead>
            <tbody ref={parent}>
              {device.map((item) => (
                <tr
                    key={item.id}
                    className=' odd:bg-slate-200 even:bg-slate-100 [&>td]:align-middle [&>td]:whitespace-break-spaces [&>td]:border-b-2 [&>td]:border-b-gray-300 [&>td]:p-3 [&>td]:pb-2'
                >
                  <TableCardList item={item as DevicesMappedApiResponse} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default TableCard
