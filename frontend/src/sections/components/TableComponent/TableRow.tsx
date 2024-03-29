import type TableCell from './TableCell'
import type TableHead from './TableHead'

function TableRow<T extends typeof TableHead | typeof TableCell> ({
  children
}: {
  children: React.ReactElement<T> | Array<React.ReactElement<T>>
}) {
  return <tr>{children}</tr>
}

export default TableRow
