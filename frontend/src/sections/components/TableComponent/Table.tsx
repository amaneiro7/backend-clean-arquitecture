import { forwardRef } from 'react'
import type TableBody from './TableBody'
import type TableHeader from './TableHeader'

interface Props extends React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  className?: string
  children: Array<React.ReactElement<typeof TableHeader | typeof TableBody>>  
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = forwardRef(function ({ children, className }: Props, ref: React.MutableRefObject<any>) {
  return (
    <>
      <section className='min-w-full max-w-max overflow-x-auto overflow-y-auto flex-1'>
        <table
          className={`relative min-w-full max-w-max border-collapse table-fixed  ${className}`}
          ref={ref}
        >
          {children}
        </table>
      </section>
    </>
  )
})
export default Table