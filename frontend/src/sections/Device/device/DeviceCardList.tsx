import { Link } from 'react-router-dom'
import { DeleteIcon } from '../../ui/icon/DeleIcon'
import { EditIcon } from '../../ui/icon/EditIcon'
import { type DevicesMappedApiResponse } from '../../../modules/shared/domain/types/responseTypes'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type CategoryId } from '../../../modules/devices/category/domain/CategoryId'
import { Computer } from '../../../modules/devices/fetures/computer/domain/Computer'

interface Props {
  item: DevicesMappedApiResponse
  category?: Primitives<CategoryId>
}
export const DeviceTableCardList: React.FC<Props> = ({ item, category }) => {
  return (
    <>
        <td className='flex'>
          <Link
            to={`/device/edit/${item.id}`}
            state={{
              device: item
            }}
          >
            <EditIcon />
          </Link>

          <a href='#'>
            <DeleteIcon />
          </a>
        </td>
        <td className='whitespace-nowrap'>{item.categoryName}</td>
        <td>{item.serial}</td>
        <td>{item.activo}</td>
        <td>{item.statusName}</td>
        <td>{item.brandName}</td>
        <td className='whitespace-nowrap text-ellipsis'>{item.modelName}</td>
        <td>{item.locationName}</td>
        <td>{item.observation}</td>
        {(Computer.isComputerCategory({ categoryId: category }) && item.computer !== null) &&
             <>
                <td>{item?.computer?.processor?.name}</td>
                <td>{item?.computer?.memoryRamCapacity ? `${item?.computer?.memoryRamCapacity} GB` : 'Sin Memoria'}</td>
                <td>{item?.computer?.hardDriveCapacity?.value ? `${item?.computer?.hardDriveCapacity?.value} GB` : 'Sin Disco'}</td>
                <td>{item?.computer?.hardDriveType?.name ?? ''}</td>
              </>

        }
    </>
  )
}
