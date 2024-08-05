import { Link } from 'react-router-dom'

interface Props extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  url: string
  stateId?: string
}

export default function TableCellEditDeleteIcon({ state, url, stateId, ...props }: Props) {
  return (
    <td
      {...props}
      className='min-h-9 h-9 min-w-20 text-xs text-ellipsis border-b-2 border-b-gray-300 p-2 text-transparent'
    >
      <Link
        to={url}
        state={{ state }}
        className='bg-secondary-800 hover:bg-secondary-900 text-white p-1 px-2 rounded-3xl'
        aria-label='icono de edición'
        aria-description='enlace para editar el elemento'
        title={`Editar el elemento con el id ${stateId ?? url}`}
      >Editar
      </Link>
    </td>
  )
}
