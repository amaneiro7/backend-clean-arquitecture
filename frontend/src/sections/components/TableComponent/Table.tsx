import type TableBody from './TableBody'
import type TableHeader from './TableHeader'

function Table ({
  className,
  children
}: {
  className: string
  children: Array<React.ReactElement<typeof TableHeader | typeof TableBody>>
}) {
  return <table className={`table-auto ${className}`}>{children}</table>
}

export default Table
