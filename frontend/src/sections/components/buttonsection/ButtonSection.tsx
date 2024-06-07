import { forwardRef, lazy, Suspense } from "react"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"

interface Props {
  handleClear: () => void
  handleAdd: () => void
  handleFilter: () => void
}

const Button = lazy(async () => import("../button/Button").then((m) => ({ default: m.Button })))
const DownloadIcon = lazy(async () => import("../icon/DownloadIcon").then((m) => ({ default: m.DownloadIcon })))
const FilterIcon = lazy(async () => import("../icon/FilterIcon").then((m) => ({ default: m.FilterIcon })))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ButtonSection = forwardRef(({handleFilter, handleAdd, handleClear}: Props, ref: React.MutableRefObject<any>) => {
  return (
    <section className='my-4 min-h-11 flex gap-2'>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          actionType='PRIMARY'
          color='terciary'
          text='Descargar'
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <DownloadIcon size='w-6' color='white' />
            </Suspense>
          }
          handle={() => {
            import("../../utils/DownloadTableExcel").then((m) => m.exportToExcel(ref))
            }}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          text='Añadir'
          actionType='PRIMARY'
          color='primary'
          handle={handleAdd}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          actionType='SECONDARY'
          color='secondary'
          type='button'
          text='Limpiar'
          handle={handleClear}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button 
          type='button'
          actionType='SECONDARY'
          color='secondary'
          text='Filtros'
          handle={handleFilter}
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <FilterIcon />
            </Suspense>
              }
        />
      </Suspense>
    </section>
  )
})
