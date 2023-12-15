import { Suspense, lazy } from 'react'
import { useFormDevice } from '../../Hooks/useFormDevice'
import { FormContainer } from '../../components/formContainer'
import InputForm from '../../components/InputForm'

const Button = lazy(async () => await import('../../ui/button'))
export const DeviceForm = () => {
  const {
    device,
    loading,
    categories,
    brands,
    models,
    status,
    handleChange,
    handleSubmit,
    handleClose
  } = useFormDevice()

  return (
    <FormContainer>
            <form
                action="submit"
                onSubmit={handleSubmit}
                className='w-[600px] flex justify-center border border-secondary'
            >
                <fieldset className='w-9/12 py-20 flex flex-col gap-5'>
                    <legend className='mb-5'>Edita el Dispositivo</legend>
                    {loading === true && '...loading'}
                    {loading === false && <>
                      <InputForm
                        device={device}
                        categories={categories}
                        brands={brands}
                        models={models}
                        status={status}
                        onChange={handleChange}
                      />
                    </>}
                    <div className='flex gap-5 justify-around'>
                      <Suspense>
                          <Button
                              type='submit'
                              actionType='CANCEL'
                              text='Cerrar'
                              handle={handleClose}
                          />
                          <Button
                              actionType='SAVE'
                              type='submit'
                              text='Guardar'
                          />

                      </Suspense>
                    </div>
                </fieldset>
            </form>
    </FormContainer>
  )
}

export default DeviceForm
