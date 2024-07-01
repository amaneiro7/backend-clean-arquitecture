import { Suspense, lazy, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

interface Props extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  handleSubmit: (event: React.FormEvent) => Promise<void>
  title: string
  url?: string
  isDisabled: boolean
  handleClose: () => void
  lastUpdated?: string
  searchInput?: JSX.Element
}

const Button = lazy(async () => await import('../button/button'))
const LinkAsButton = lazy(async () => await import('../button/LinkAsButton').then(m => ({ default: m.LinkAsButton })))
const LastUpdated = lazy(async () => import('../LastUpdated').then(m => ({ default: m.LastUpdated })))
const PageTitle = lazy(async () => import('../PageTitle'))
const CancelIcon = lazy(() => import('../icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('../icon/RighArrowIcon').then(m => ({ default: m.RightArrowIcon })))
const AddIcon = lazy(() => import('../icon/AddIcon').then(m => ({ default: m.AddIcon })))

export default function FormContainer({ url, title, searchInput, children, isDisabled, handleSubmit, handleClose, lastUpdated, ...props }: React.PropsWithChildren<Props>) {
  const location = useLocation()

  const isEdit = useMemo(() => location.pathname.includes('edit'), [location])
  return (
    <>
      <section className='w-full min-w-full grid place-content-center'>
        <form
          action='submit'
          onSubmit={handleSubmit}
          className='min-w-[800px] m-10 py-8 flex justify-center border border-secondary rounded-md'
          {...props}
        >
          <fieldset className='max-w-[75%] w-9/12 py-10 pb-20 grid gap-5 relative'>
            <legend>              
              <PageTitle title={!isEdit ? 'Agregar un nuevo ' + title : 'Editar un ' + title} />              
            </legend>
            {searchInput}
            <div className='flex gap-5 justify-around'>              
              <Button
                type='button'
                actionType='CANCEL'
                text='Cancelar'
                handle={handleClose}
                isDisabled={isDisabled}
                hoverTranslate
                icon={
                  <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                    <CancelIcon width={20} className='aspect-square' />
                  </Suspense>
                  }
              />
              <Button
                actionType='SAVE'
                type='submit'
                text='Guardar'
                isDisabled={isDisabled}
                hoverTranslate
                icon={
                  <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
                    <RightArrowIcon width={20} className='aspect-square fill-white' />                      
                  </Suspense>
                  }
              />
              {isEdit && <LinkAsButton
                actionType='ACTION'
                text='Añadir un nuevo'
                url={url}
                hoverTranslate
                icon={
                  <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                    <AddIcon width={20} className='aspect-square fill-white' />
                  </Suspense>
                  }
                         />}              
            </div>
            {children}
            {lastUpdated !== undefined && <LastUpdated updatedAt={lastUpdated} />}
          </fieldset>
        </form>
      </section>
    </>
  )
}
