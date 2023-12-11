import { Link } from 'react-router-dom'
import { type MappedDevice } from '../types/types'
import { DeleteIcon } from '../ui/icon/DeleIcon'
import { EditIcon } from '../ui/icon/EditIcon'

interface Props {
  item: MappedDevice
}
export const TableCardList: React.FC<Props> = ({ item }) => {
  return (
    <>
        <td className='sticky z-10 top-0 left-0'>{item.categoryName}</td>
        <td>{item.serial}</td>
        <td>{item.activo}</td>
        <td>{item.status}</td>
        <td>{item.brandName}</td>
        <td>{item.modelName}</td>
        <td className='sticky z-10 top-0 left-0 flex'>
          <Link
            to={`/device/${item.id}`}
            state={{
              device: item
            }}
          >
            <EditIcon />
            {/* Editar */}
          </Link>

          <a href='#'>
            <DeleteIcon />
            {/* Eliminar */}
          </a>
        </td>
    </>
  )
}
