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
    <section className='w-full overflow-x-auto overflow-y-auto'>
      <table
        className={`w-full border-collapse table-fixed ${className} sticky z-50`}
      >
        {children}
      </table>
    </section>
  )
}
