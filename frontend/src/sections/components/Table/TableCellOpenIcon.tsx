import { lazy, Suspense } from "react"

type Props= React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & {
  open: boolean,   
}

const ArrowBadgeIcon = lazy(async () => import("../icon/ArrowBadge").then(m => ({ default: m.ArrowBadgeIcon })))


export function TableCellOpenIcon({ open, ...props }: React.PropsWithChildren<Props>) {
  return (
    <td
      className='min-w-min max-w-min w-8 border-b-2 border-b-gray-300 content-center'
      {...props}
    >
      <Suspense><ArrowBadgeIcon className={`w-4 mx-0 my-auto text-center aspect-square transition-transform ${open ? 'rotate-90' : '-rotate-90'} text-secondary-600 hover:text-secondary-700`} /></Suspense>
    </td>
  )
}

