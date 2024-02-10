import { Suspense, lazy, type PropsWithChildren, type FC, type FormEvent } from 'react'

interface Props {
  handleSubmit: (event: FormEvent) => Promise<void>
  title: string
  isDisabled: boolean
  handleClose: () => void
}

const Button = lazy(async () => await import('../../ui/button'))
// const InputForm = lazy(async () => await import('../../components/InputForm'))

export const FormContainer: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  isDisabled,
  handleSubmit,
  handleClose
}) => {
  return (
        <section className="w-full grid place-content-center">
            <form
                action="submit"
                onSubmit={(event) => { void handleSubmit(event) }}
                className='min-w-[800px] m-10 pt-7 flex justify-center border border-secondary rounded-md'
            >
                <fieldset className='w-9/12 py-10 pb-20 grid gap-5'>
                    <legend className='mt-5'>{title}</legend>
                    <div className='flex gap-5 justify-around'>
                      <Suspense>
                          <Button
                              type='button'
                              actionType='CANCEL'
                              text='Cerrar'
                              handle={handleClose}
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
                </fieldset>
            </form>
        </section>
  )
}
