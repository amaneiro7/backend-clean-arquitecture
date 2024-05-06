import { Suspense, lazy, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  handleSubmit: (event: React.FormEvent) => Promise<void>
  title: string
  url?: string
  isDisabled: boolean
  handleClose: () => void
  lastUpdated?: string
}

const Button = lazy(async () => await import('../button'))
const LinkAsButton = lazy(async () => await import('../button/LinkAsButton').then(m => ({ default: m.LinkAsButton })))
const LastUpdated = lazy(async () => import('../LastUpdated').then(m => ({ default: m.LastUpdated })))
const PageTitle = lazy(async () => import('../PageTitle'))

export default function FormContainer({ url, title, children, isDisabled, handleSubmit, handleClose, lastUpdated }: React.PropsWithChildren<Props>) {
  const location = useLocation()
  
  const isEdit = useMemo(() => location.pathname.includes('edit'), [location])
  return (
    <>
      <section className="w-full min-w-full grid place-content-center">
        <form
          action="submit"
          onSubmit={(event) => { void handleSubmit(event) }}
          className='min-w-[800px] m-10 py-8 flex justify-center border border-secondary rounded-md'
        >
          <fieldset className='w-9/12 py-10 pb-20 grid gap-5 relative'>
            <legend >
              <Suspense>
                <PageTitle title={!isEdit ? 'Agregar un nuevo ' + title : 'Editar un ' + title} />
              </Suspense>
            </legend>
            <div className='flex gap-5 justify-around'>
              <Suspense>
                <Button
                  type='button'
                  actionType='CANCEL'
                  text='Cerrar'
                  handle={handleClose}
                  isDisabled={isDisabled}
                />
                <Button
                  actionType='SAVE'
                  type='submit'
                  text='Guardar'
                  isDisabled={isDisabled}
                />
                {isEdit && <LinkAsButton 
                  actionType='ACTION'                  
                  text='Añadir un nuevo'
                  url={url}
                />}
              </Suspense>
            </div>
            {children}
            {lastUpdated !== undefined &&
              <Suspense>
                <LastUpdated updatedAt={lastUpdated} />
              </Suspense>}
          </fieldset>
        </form>
      </section>
    </>
  )
}
