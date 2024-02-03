import { Link } from 'react-router-dom'
import { DeleteIcon } from '../../ui/icon/DeleIcon'
import { EditIcon } from '../../ui/icon/EditIcon'
import { type DevicePrimitives } from '../../../modules/devices/devices/devices/domain/Device'

interface Props {
  item: DevicePrimitives
}
export const TableCardList: React.FC<Props> = ({ item }) => {
  return (
    <>
        <td className='sticky z-10 top-0 left-0'>{item.modelId}</td>
        <td>{item.serial}</td>
        <td>{item.activo}</td>
        <td>{item.statusId}</td>
        <td>{item.modelId}</td>
        <td>{item.statusId}</td>
        <td className='sticky z-10 top-0 left-0 flex'>
          <Link
            to={`/device/edit/${item.id}`}
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
