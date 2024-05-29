import { Link } from 'react-router-dom'
import { EditIcon } from '../icon/EditIcon'
// import { DeleteIcon } from '../../ui/icon/DeleIcon'

export default function TableCellEditDeleteIcon({ state, url }: { state: any, url: string }) {
  return (
    <td className='h-min w-full place-content-center align-middle text-xs text-ellipsis whitespace-nowrap border-b-2 border-b-gray-300 flex'>
      <EditIcon>
        <Link
          to={url}
          state={{ state }}
          className='absolute w-full h-full'
        >
        </Link>
      </EditIcon>
    </td>
  )
}
