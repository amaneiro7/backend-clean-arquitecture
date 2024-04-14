import { type FC } from 'react'
import { type DevicesMappedApiResponse } from '../../../../modules/shared/domain/types/responseTypes'
// import { useAutoAnimate } from '@formkit/auto-animate/react'
import { DeviceTableCardList } from './DeviceCardList'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../../modules/devices/category/domain/CategoryId'

interface Props {
  device: DevicesMappedApiResponse[]
  category?: Primitives<CategoryId>
}
const DeviceTableCard: FC<Props> = ({ device, category }) => {
  // const [parent] = useAutoAnimate(/* optional config */)

  return (
    <tbody>
        {device.map((item) => (
            <tr
                key={item.id}
                    className=' [&>td]:odd:bg-slate-200 [&>td]:even:bg-slate-100 [&>td]:align-middle [&>td]:whitespace-nowrap [&>td]:border-b-2 [&>td]:border-b-gray-300 [&>td]:p-3 [&>td]:pb-2'
                >
                  <DeviceTableCardList category={category} item={item} />
            </tr>
        ))}
    </tbody>
  )
}

export default DeviceTableCard
