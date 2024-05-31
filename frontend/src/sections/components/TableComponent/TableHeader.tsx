import type TableHead from './TableHead'
import type TableRow from './TableRow'

export default function TableHeader({ children, className }: { className?: string, children: React.ReactElement<typeof TableRow<typeof TableHead>> }) {
  return (
    <thead className={`w-max sticky z-20 top-0 drop-shadow-lg ${className ?? 'bg-slate-50'}`}>
      {children}
    </thead>
  )
}
