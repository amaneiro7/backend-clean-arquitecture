import { TableRowSkeleton } from '../skeleton/TableRowSkeleton'
import type TableCell from './TableCell'
import type TableHead from './TableHead'

interface Props<T extends typeof TableHead | typeof TableCell> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement> {
  loading?: boolean,
  totalTd?: number
  children: React.ReactElement<T> | Array<React.ReactElement<T>>
}

export default function TableRow<T extends typeof TableHead | typeof TableCell>({
  children,
  totalTd,
  loading
}: Props<T>) {
  return (
    <>
      {loading ? <TableRowSkeleton totalTd={totalTd} />
      : <tr className='[&>td]:odd:bg-slate-100 [&>td]:even:bg-slate-200 text-xs'>{children}</tr>}
    </>
  )
}
