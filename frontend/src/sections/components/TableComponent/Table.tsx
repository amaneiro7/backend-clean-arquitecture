import { forwardRef, lazy, Suspense } from 'react'
import type TableBody from './TableBody'
import type TableHeader from './TableHeader'

interface Props extends React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
  className?: string
  children: Array<React.ReactElement<typeof TableHeader | typeof TableBody>>
  tabs?: React.ReactElement
  buttons?: React.ReactElement
}

const Button = lazy(async () => import('../button'))
const DownloadIcon = lazy(async () => import('../icon/DownloadIcon').then(m => ({ default: m.DownloadIcon })))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = forwardRef(function ({ children, className, tabs }: Props, ref: React.MutableRefObject<any>) {
  return (
    <>
      <section className='my-4 min-h-11 flex gap-2'>
        <Suspense>
          <Button
            type='button'
            actionType='SAVE'
            text='Descargar'
            icon={<Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}><DownloadIcon size='w-6' color='white' /></Suspense>}
            handle={() => { import('../../utils/DownloadTableExcel').then(m => m.exportToExcel(ref)) }}
          />
        </Suspense>
      </section>

      {tabs}
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