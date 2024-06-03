import { TableRowSkeleton } from '../skeleton/TableRowSkeleton'
import type TableCell from './TableCell'
import type TableHead from './TableHead'

export default function TableRow<T extends typeof TableHead | typeof TableCell>({
  children,
  totalTd,
  loading
}: {
  loading?: boolean,
  totalTd?: number
  children: React.ReactElement<T> | Array<React.ReactElement<T>>
}) {
  return (
    <>
      {!loading && <tr className='[&>td]:odd:bg-slate-100 [&>td]:even:bg-slate-200 text-xs'>{children}</tr>}
      {loading && <TableRowSkeleton totalTd={totalTd} />}
    </>
  )
}
