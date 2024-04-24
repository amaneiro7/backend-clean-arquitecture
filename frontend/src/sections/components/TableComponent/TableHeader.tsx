import type TableHead from './TableHead'
import type TableRow from './TableRow'

export default function TableHeader ({ children }: { children: React.ReactElement<typeof TableRow<typeof TableHead>> }) {
  return (
    <thead className='w-max bg-slate-50 sticky z-20 top-0 drop-shadow-lg'>
      {children}
    </thead>
  )
}
