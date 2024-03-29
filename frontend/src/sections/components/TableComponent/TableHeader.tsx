import type TableHead from './TableHead'
import type TableRow from './TableRow'

function TableHeader ({ children }: { children: React.ReactElement<typeof TableRow<typeof TableHead>> }) {
  return (
    <thead>
      {children}
    </thead>
  )
}

export default TableHeader
