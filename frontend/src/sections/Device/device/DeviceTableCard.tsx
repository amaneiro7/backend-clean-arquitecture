import { type FC } from 'react'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TableCardList } from '../../components/TablerCardList'

interface Props {
  device: DevicesMappedApiResponse[]
}
const DeviceTableCard: FC<Props> = ({ device }) => {
  // const [parent] = useAutoAnimate(/* optional config */)

  return (
    <tbody>
        {device.map((item) => (
            <tr
                key={item.id}
                    className=' odd:bg-slate-200 even:bg-slate-100 [&>td]:align-middle [&>td]:whitespace-break-spaces [&>td]:border-b-2 [&>td]:border-b-gray-300 [&>td]:p-3 [&>td]:pb-2'
                >
                  <TableCardList item={item} />
            </tr>
        ))}
    </tbody>
  )
}

export default DeviceTableCard
