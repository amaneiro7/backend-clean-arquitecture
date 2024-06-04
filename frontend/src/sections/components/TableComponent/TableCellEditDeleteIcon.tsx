import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
const EditIcon = lazy(async () => import('../icon/EditIcon').then(m => ({ default: m.EditIcon })))

interface Props extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> {
  state: any,
  url: string
}

export default function TableCellEditDeleteIcon({ state, url, ...props }: Props) {
  return (
    <td
      {...props}
      className='min-h-9 h-9 text-xs text-ellipsis border-b-2 border-b-gray-300 p-2'
    >
      
      <Suspense fallback={<div className='w-6 rounded-full bg-slate-400 aspect-square animate-pulse'></div>}>
        <EditIcon size='w-6'>
          <Link
            to={url}
            state={{ state }}
            className='absolute w-full h-full'
            aria-label='icono de edición'
            aria-description='enlace para editar el elemento'
            title={`Editar el elemento con el id ${url}`}
          >
          </Link>
        </EditIcon>
      </Suspense>
    </td>
  )
}
