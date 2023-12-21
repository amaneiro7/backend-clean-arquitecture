import { Suspense, lazy } from 'react'

interface Props {
  onSubmit
  title: string
  isLoading: boolean
  isDisabled: boolean
  inputsForm
  onClose
}

const Button = lazy(async () => await import('../../ui/button'))
const InputForm = lazy(async () => await import('../../components/InputForm'))

export const FormContainer = ({
  title,
  inputsForm,
  isLoading,
  isDisabled,
  onSubmit,
  onClose
}: Props) => {
  return (
        <section className="w-full grid place-content-center">
            <form
                action="submit"
                onSubmit={onSubmit}
                className='w-[600px] m-10 pt-7 flex justify-center border border-secondary rounded-md'
            >
                <fieldset className='w-9/12 py-10 pb-20 flex flex-col gap-5'>
                    <legend className='mt-5'>{title}</legend>
                    {isLoading && '...loading'}
                    {!isLoading &&
                      <Suspense>
                        <InputForm
                          inputsForm={inputsForm}
                        />
                      </Suspense>}
                    <div className='flex gap-5 justify-around'>
                      <Suspense>
                          <Button
                              type='submit'
                              actionType='CANCEL'
                              text='Cerrar'
                              handle={onClose}
                          />
                          <Button
                              actionType='SAVE'
                              type='submit'
                              text='Guardar'
                              isDisabled={isDisabled}
                          />
                      </Suspense>
                    </div>
                </fieldset>
            </form>
        </section>
  )
}
