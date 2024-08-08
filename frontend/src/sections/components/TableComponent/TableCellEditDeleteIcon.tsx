import { Link, LinkProps } from 'react-router-dom'
import { EditIcon } from '../icon/EditIcon'
import { Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { TypeOfSiteId } from '../../../modules/location/typeofsites/domain/typeOfSiteId'

interface Props extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  state: LinkProps['state'],
  url: string
  stateId?: string
  typeOfSiteId?: Primitives<TypeOfSiteId>
}




export default function TableCellEditDeleteIcon({ state, url, stateId, typeOfSiteId, ...props }: Props) {
  const borderColor = 
    typeOfSiteId === TypeOfSiteId.SitesOptions.ADMINISTRATIVE ? 'border-l-terciary-800' :
    typeOfSiteId === TypeOfSiteId.SitesOptions.AGENCY ? 'border-l-focus' :
    typeOfSiteId === TypeOfSiteId.SitesOptions.ALMACEN ? 'border-l-error' : 'border-l-transparent'
  return (
    <td
      {...props}
      className={`min-h-9 h-9 min-w-20 text-xs text-ellipsis border-b-[3px] border-l-[3px] border-b-gray-300 p-2 text-transparent ${borderColor}`}
    >
      <span className='relative'>
        <Link
          to={url}
          state={{ state }}          
          className='absolute w-full h-full'
          aria-label='icono de edición'
          aria-description='enlace para editar el elemento'
          title={`Editar el elemento con el id ${stateId ?? url}`}
        />
        <EditIcon width={16} className='ml-2 w-6 p-1 aspect-square bg-secondary text-white rounded-full' />
      </span>
    </td>
  )
}
