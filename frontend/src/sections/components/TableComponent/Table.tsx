import type TableBody from './TableBody'
import type TableHeader from './TableHeader'

export default function Table ({
  className,
  children
}: {
  className?: string
  children: Array<React.ReactElement<typeof TableHeader | typeof TableBody>>
}) {
  return (
    <section className='max-w-max overflow-x-auto overflow-y-auto'>
      <table
        className={`relative max-w-max border-collapse table-fixed ${className}`}
      >
        {children}
      </table>
    </section>
  )
}
