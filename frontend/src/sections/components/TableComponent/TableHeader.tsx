import type TableHead from './TableHead'
import type TableRow from './TableRow'

export default function TableHeader ({ children }: { children: React.ReactElement<typeof TableRow<typeof TableHead>> }) {
  return (
    <thead className='bg-slate-200 sticky z-50'>
      {children}
    </thead>
  )
}
