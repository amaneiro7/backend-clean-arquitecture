import { Link } from 'react-router-dom'
import { EditIcon } from '../../../ui/icon/EditIcon'
import { DeleteIcon } from '../../../ui/icon/DeleIcon'
import { type ComputerAPIResponse } from '../../../../modules/devices/fetures/computer/infrastructure/ComputerApiResponse'

interface Props {
  item: ComputerAPIResponse
}
const TableComputerList: React.FC<Props> = ({ item }) => {
  return (
    <>
        <td className='sticky z-10 top-0 left-0'>{item.device.serial}</td>
        <td>{item.device.activo}</td>
        <td>{item.device.model.brand.name}</td>
        <td>{item.device.model.name}</td>
        <td>{item.category.name}</td>
        <td>{item.operatingSystem.version}</td>
        <td>{item.operatingSystemArq.name}</td>
        <td>{item.memoryRamCapacity}</td>
        <td>{item.hardDriveCapacity.value}</td>
        <td>{item.hardDriveType.name}</td>
        <td>{item.processor.name}</td>
        <td>{item.ipAddress}</td>
        <td>{item.macAddress}</td>
        <td className='sticky z-10 top-0 right-0 flex'>
          <Link
            to={`/device/edit/${item.deviceId}`}
          >
            <EditIcon />
          </Link>

          <a href='#'>
            <DeleteIcon />
          </a>
        </td>
    </>
  )
}

export default TableComputerList
