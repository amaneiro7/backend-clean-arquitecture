import { Suspense, lazy, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { type HistoryApiResponse } from '../../../modules/shared/domain/types/responseTypes'

interface Props extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  handleSubmit: (event: React.FormEvent) => Promise<void>
  title: string
  url?: string
  isDisabled: boolean
  handleClose: () => void
  lastUpdated?: string
  updatedBy?: HistoryApiResponse[]
  searchInput?: JSX.Element
}

const Button = lazy(async () => await import('../button/button'))
const LinkAsButton = lazy(async () => await import('../button/LinkAsButton').then(m => ({ default: m.LinkAsButton })))
const LastUpdated = lazy(async () => import('../LastUpdated').then(m => ({ default: m.LastUpdated })))
const UpdatedBy = lazy(async () => import('../UpdatedBy').then(m => ({ default: m.UpdatedBy })))

const CancelIcon = lazy(() => import('../icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('../icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon })))
const CircleSpinningIcon = lazy(() => import('../icon/CircleSpinning').then(m => ({ default: m.CircleSpinningIcon })))
const AddIcon = lazy(() => import('../icon/AddIcon').then(m => ({ default: m.AddIcon })))

export default function FormContainer({ url, title, searchInput, children, isDisabled, handleSubmit, handleClose, updatedBy, lastUpdated, ...props }: React.PropsWithChildren<Props>) {
  const location = useLocation()

  const isEdit = useMemo(() => location.pathname.includes('edit'), [location.pathname])
  return (
    <>
      <section className='w-full max-w-5xl mx-auto p-8 pl-0 grid grid-cols-1 place-content-center gap-8'>
        <div className='border border-gray-400 rounded-lg px-8 py-4 flex flex-col gap-3'>              
          <h1 className='text-sm md:text-base lg:text-lg text-secondary font-extrabold'>{!isEdit ? 'Agregar un nuevo ' + title : 'Editar un ' + title}</h1>
          <p className='w-9/12 text-xs md:text-sm lg:text-base text-black'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque ipsa omnis assumenda numquam et earum at doloremque delectus possimus laudantium officia, asperiores dolore reiciendis eum.</p>
          <div className='flex flex-col justify-end items-end md:flex-row md:justify-between gap-3'>
            {searchInput}
            {isEdit && <LinkAsButton
              actionType='ACTION'
              text='Agregar nuevo'
              url={url}
              hoverTranslate                
              size='content'
              icon={
                <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                  <AddIcon width={20} className='aspect-square fill-white stroke-[3px]' />
                </Suspense>
                  }
                       />}  

          </div>
        </div>
        

        <form
          action='submit'
          onSubmit={handleSubmit}
          className='bg-white flex justify-center border border-gray-400 rounded-lg p-8'
          {...props}
        >
          <fieldset className='w-full grid gap-5 relative'>
            {children}
            <div className='flex flex-col mt-8 md:flex-row md:w-1/2 gap-5 justify-around justify-self-end'>
              <Button
                actionType='SAVE'                
                type='submit'
                text={isDisabled ? 'Procesando...' : 'Continuar'}
                isDisabled={isDisabled}
                hoverTranslate
                size='full'
                icon={
                  isDisabled ? 
                    <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
                      <CircleSpinningIcon width={20} />
                    </Suspense>
                  : 
                    <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>                      
                      <RightArrowIcon width={20} className='aspect-square fill-white' />                      
                    </Suspense>
                  }
              />
              <Button
                type='button'
                actionType='CANCEL'
                size='full'
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
                         
            </div>
            <p className='justify-self-end text-sm text-black/80'>
              {lastUpdated !== undefined && 
                <>
                  <LastUpdated updatedAt={lastUpdated} />
                  <UpdatedBy history={updatedBy} />
                </>}
            </p>
          </fieldset>
        </form>
      </section>
    </>
  )
}
