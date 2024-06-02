import { forwardRef, lazy, Suspense } from 'react'
import type TableBody from './TableBody'
import type TableHeader from './TableHeader'

interface Props extends React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  className?: string
  children: Array<React.ReactElement<typeof TableHeader | typeof TableBody>>
  tabs?: React.ReactElement<any>
}

const Button = lazy(async () => import('../button'))

const Table = forwardRef(function ({ children, className, tabs }: Props, ref: React.MutableRefObject<any>) {
  return (
    <>

      <Suspense>
        <Button
          type='button'
          actionType='SAVE'
          text='Exportar a Excel'
          handle={() => { import('../../components/button/DownloadTableExcel').then(m => m.exportToExcel(ref)) }}
        />
      </Suspense>

      {tabs}
      <section className='min-w-full max-w-max overflow-x-auto overflow-y-auto'>
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