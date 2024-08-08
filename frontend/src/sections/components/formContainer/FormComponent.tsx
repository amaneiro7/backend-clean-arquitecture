import { lazy, Suspense } from 'react'
import { HistoryApiResponse } from '../../../modules/shared/domain/types/responseTypes'

interface Props extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    handleSubmit: (event: React.FormEvent) => Promise<void>    
    isDisabled: boolean
    handleClose: () => void    
    lastUpdated?: string
    updatedBy?: HistoryApiResponse[]    
  }

const Button = lazy(async () => await import('../button/button'))
const LastUpdated = lazy(async () => import('../LastUpdated').then(m => ({ default: m.LastUpdated })))
const UpdatedBy = lazy(async () => import('../UpdatedBy').then(m => ({ default: m.UpdatedBy })))
const CancelIcon = lazy(() => import('../icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() => import('../icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon })))
const CircleSpinningIcon = lazy(() => import('../icon/CircleSpinning').then(m => ({ default: m.CircleSpinningIcon })))



export function FormComponent ({ handleSubmit, lastUpdated, updatedBy, handleClose, isDisabled ,children,...props }: Props) {
  return (
    <form
      action='submit'
      onSubmit={handleSubmit}
      className='w-full bg-white flex justify-center border border-gray-400 rounded-lg p-8'
      {...props}
    >
      <fieldset className='w-full grid gap-5 relative'>
        {children}
        <div className='flex flex-col mt-8 md:flex-row md:w-1/2 gap-5 justify-around justify-self-end'>
          <Button
            color='green'                
            type='submit'
            text={isDisabled ? 'Procesando...' : 'Continuar'}
            buttonSize='large'
            disabled={isDisabled}
            hoverTranslation
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
            color='gray'
            size='full'
            buttonSize='large'
            text='Cancelar'                
            onClick={handleClose}
            disabled={isDisabled}
            hoverTranslation
            icon={
              <Suspense fallback={<div className='w-6 h-6 rounded-full bg-slate-200 animate-pulse' />}>
                <CancelIcon width={20} className='aspect-square' />
              </Suspense>
                  }
          />
                         
        </div>          
        <p className='justify-self-end text-sm text-black/80'>
          {lastUpdated !== undefined && <LastUpdated updatedAt={lastUpdated} />}              
          {(updatedBy !== undefined && updatedBy.length > 0) && <UpdatedBy history={updatedBy} />}              
        </p>          
      </fieldset>
    </form>
  )
}