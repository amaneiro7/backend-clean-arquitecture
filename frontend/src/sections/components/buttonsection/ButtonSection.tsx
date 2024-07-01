import { lazy, memo, Suspense } from "react"
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading"

interface Props {
  handleClear: () => void
  handleAdd: () => void
  handleFilter: () => void
  handleExportToExcel: () => void
}

const Button = lazy(async () => import("../button/button"))
const DownloadIcon = lazy(async () => import("../icon/DownloadIcon").then((m) => ({ default: m.DownloadIcon })))
const AddIcon = lazy(async () => import("../icon/AddIcon").then((m) => ({ default: m.AddIcon })))
const FilterIcon = lazy(async () => import("../icon/FilterIcon").then((m) => ({ default: m.FilterIcon })))

export const ButtonSection = memo(({handleFilter, handleAdd, handleClear, handleExportToExcel}: Props) => {
  return (
    <section className='my-4 min-h-11 flex gap-2'>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          actionType='SAVE'
          text='Descargar'
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <DownloadIcon width={20} className='aspect-square' />
            </Suspense>
          }
          handle={handleExportToExcel}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          text='Añadir'
          actionType='ACTION'
          handle={handleAdd}
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <AddIcon width={20} fill='white' className='aspect-square' />
            </Suspense>
          }
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          actionType='SECONDARY'          
          type='button'
          text='Limpiar'
          handle={handleClear}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button 
          type='button'
          actionType='SECONDARY'
          text='Filtros'
          handle={handleFilter}
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <FilterIcon width={14} className='aspect-square' />
            </Suspense>
              }
        />
      </Suspense>
    </section>
  )
})