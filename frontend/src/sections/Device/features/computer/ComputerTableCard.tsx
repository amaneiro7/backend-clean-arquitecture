import { type FC } from 'react'
import TableComputerList from './ComputerTableList'
import { type ComputerAPIResponse } from '../../../../modules/devices/fetures/computer/infrastructure/ComputerApiResponse'
interface Props {
  computer: ComputerAPIResponse[]
}

const ComputerTableCard: FC<Props> = ({ computer }) => {
  return (
        <tbody>
            {
                computer.map(item => (
                    <tr
                        key={item.id}
                        className='[&>td]:odd:bg-slate-200 [&>td]:even:bg-slate-100 [&>td]:align-middle [&>td]:w-fit [&>td]:whitespace-nowrap [&>td]:border-b-2 [&>td]:border-b-gray-300 [&>td]:p-3 [&>td]:pb-2'
                    >
                        <TableComputerList item={item}/>
                    </tr>
                ))
            }
        </tbody>
  )
}

export default ComputerTableCard
