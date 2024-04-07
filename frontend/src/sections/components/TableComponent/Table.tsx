import type TableBody from './TableBody'
import type TableHeader from './TableHeader'

export default function Table ({
  className,
  children
}: {
  className: string
  children: Array<React.ReactElement<typeof TableHeader | typeof TableBody>>
}) {
  return <table className={`min-w-full border-collapse table-fixed ${className}`}>{children}</table>
}
