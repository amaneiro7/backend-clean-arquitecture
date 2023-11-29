import FormInput from '../ui/text-field'
import { useStatus } from '../Hooks/useStatus'
import { Suspense } from 'react'
import { Select } from '../ui/select'
import { FormContainer } from '../components/FormContainer'
import { useEditDevice } from '../Hooks/useEditDevice'
import { Button } from '../ui/button'

function EditDevice () {
  const {
    device,
    loading,
    categories,
    filterdBrands,
    filterdModels,
    handleChange,
    handleSubmit,
    handleClose
  } = useEditDevice()

  const { status } = useStatus()

  return (
    <FormContainer>
            <form action="submit" onSubmit={handleSubmit} className='w-[600px] flex justify-center border border-secondary'>
                <fieldset className='w-9/12 py-20 flex flex-col gap-5'>
                    <legend className='mb-5'>Edita el Dispositivo</legend>
                    {loading && '...loading'}
                    {!loading && <>
                            <Suspense fallback='...Loading Select Options'>
                                <Select
                                    name='categoryId'
                                    value={device?.categoryId}
                                    label='Categorie del Dispositivo'
                                    options={categories}
                                    onChange={handleChange}
                                    placeholder='-- Seleccione la Categoria --'
                                />
                            </Suspense>
                        <FormInput
                                name={'serial'}
                                type='text'
                                label={'serial'}
                                placeholder={'device?.serial'}
                                value={device?.serial}
                                handle={handleChange}
                            />
                            <FormInput
                                name={'activo'}
                                type='text'
                                label={'activo'}
                                placeholder={device?.activo}
                                value={device?.activo}
                                handle={handleChange}
                            />
                            <Suspense fallback='...Loading Select Options'>
                                <Select
                                    name='status'
                                    value={device?.status}
                                    label='Estado del Dispositivo'
                                    options={status}
                                    onChange={handleChange}
                                    placeholder='-- Seleccione el Estado --'
                                />
                            </Suspense>
                            <Suspense fallback='...Loading Select Options'>
                                <Select
                                    name='brandId'
                                    value={device?.brandId}
                                    label='Marca del Dispositivo'
                                    options={filterdBrands}
                                    onChange={handleChange}
                                    placeholder='-- Seleccione la Marca --'
                                />
                            </Suspense>
                            <Suspense fallback='...Loading Select Options'>
                                <Select
                                    name='modelId'
                                    value={device?.modelId}
                                    label='Modelo del Dispositivo'
                                    options={filterdModels}
                                    onChange={handleChange}
                                    placeholder='-- Seleccione el Modelo --'
                                />
                            </Suspense>
                    </>}
                    <div className='flex gap-5 justify-around'>
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
                    </div>
                </fieldset>
            </form>
    </FormContainer>
  )
}

export default EditDevice
