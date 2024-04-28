import { Suspense, lazy } from 'react'
import PageTitle from '../PageTitle'
import { LastUpdated } from '../LastUpdated'

interface Props {
  handleSubmit: (event: React.FormEvent) => Promise<void>
  title: string
  isDisabled: boolean
  handleClose: () => void
  lastUpdated?: string
}

const Button = lazy(async () => await import('../../ui/button'))

export default function FormContainer({ title, children, isDisabled, handleSubmit, handleClose, lastUpdated }: React.PropsWithChildren<Props>) {
  return (
    <>
      <section className="w-full min-w-full grid place-content-center">
        <form
          action="submit"
          onSubmit={(event) => { void handleSubmit(event) }}
          className='min-w-[800px] m-10 py-8 flex justify-center border border-secondary rounded-md'
        >
          <fieldset className='w-9/12 py-10 pb-20 grid gap-5 relative'>
            <legend >{<PageTitle title={title} />}</legend>
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
              </Suspense>
            </div>
            {children}
            {lastUpdated !== undefined && <LastUpdated updatedAt={lastUpdated} />}
          </fieldset>
        </form>
      </section>
    </>
  )
}
