import { type Device } from '../types/types'

interface Props {
  item: Device
}
export const TableCardList: React.FC<Props> = ({ item }) => {
  return (
    <>
        <td className='sticky z-10 top-0 left-0'>{item.model.category.name}</td>
        <td>{item.serial}</td>
        <td>{item.activo}</td>
        <td>{item.status}</td>
        <td>{item.model.brand.name}</td>
        <td>{item.model.name}</td>
        <td className='sticky z-10 top-0 left-0'>
        <a href='#'>Editar</a>
        <a href='#'>Eliminar</a>
        </td>
    </>
  )
}
