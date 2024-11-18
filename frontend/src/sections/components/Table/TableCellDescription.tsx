import { lazy, Suspense } from "react"
import { type LinkProps } from "react-router-dom"
import { type TableCellDescInfo } from "./TableCellDescInfo"
import './TableCellDescription.css'

const TableCellDescEdit = lazy(async () => import("./TableCellDescEdit").then(m => ({ default: m.TableCellDescEdit })))
type Props<T> = React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement> & {
    colspan: number
    open: boolean
    state: LinkProps['state'],
    url: string
    stateId?: string
    children: React.ReactElement<T> | Array<React.ReactElement<T>>
}

export function TableCellDescription<T extends typeof TableCellDescInfo> ({colspan, open, state, url, stateId, children, ...props}: Props<T>) {
    return (
      <tr className={`tableCellDesc ${open ? 'open' : ''}`}>
        <td className='bg-slate-200 border-b-gray-300' colSpan={colspan} {...props}>
          <div className='tableCellDescContainer'>
            <div aria-description='Informacion' className='flex gap-8'>
              {children}
            </div>
            <Suspense><TableCellDescEdit state={state} url={url} stateId={stateId} /></Suspense>
          </div>

        </td>
      </tr>
    )
}