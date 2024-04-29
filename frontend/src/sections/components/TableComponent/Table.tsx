import { forwardRef } from 'react'
import { DownloadTable } from '../button/DownloadTableExcel'
import type TableBody from './TableBody'
import type TableHeader from './TableHeader'

interface Props {
  className?: string
  children: Array<React.ReactElement<typeof TableHeader | typeof TableBody>>  
}

const Table = forwardRef(function ({ children, className}: Props, ref) {  
  return (
    <section className='min-w-full max-w-max overflow-x-auto overflow-y-auto'>
      <DownloadTable ref={ref.current} />
      <table
        className={`relative min-w-full max-w-max border-collapse table-fixed ${className}`}
        ref={ref}
      >
        {children}
      </table>
    </section>
  )
}
)
export default Table