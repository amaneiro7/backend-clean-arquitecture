import { lazy, memo, Suspense } from "react"
import { InputSkeletonLoading } from "../../components/skeleton/inputSkeletonLoading"


interface Props {
  handleClear: () => void
  handleAdd: () => void
  handleExportToExcel: () => void
}

const Button = lazy(() => import("../../components/button/button"))
const DownloadIcon = lazy(() => import("../../components/icon/DownloadIcon").then((m) => ({ default: m.DownloadIcon })))
const AddIcon = lazy(() => import("../../components/icon/AddIcon").then((m) => ({ default: m.AddIcon })))

export const ButtonSection = memo(({handleAdd, handleClear, handleExportToExcel}: Props) => {
  return (
    <section className='my-4 min-h-11 flex gap-2'>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          color='green'
          buttonSize='large'
          size='content'
          text='Descargar'
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <DownloadIcon width={20} className='aspect-square' />
            </Suspense>
          }
          onClick={handleExportToExcel}
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          type='button'
          text='Añadir'
          color='orange'
          buttonSize='large'
          size='content'
          onClick={handleAdd}
          icon={
            <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
              <AddIcon width={20} fill='white' className='aspect-square' />
            </Suspense>
          }
        />
      </Suspense>
      <Suspense fallback={<InputSkeletonLoading />}>
        <Button
          color='secondary'          
          buttonSize='large'
          size='content'
          type='button'
          text='Limpiar'
          onClick={handleClear}
        />
      </Suspense>
    </section>
  )
})