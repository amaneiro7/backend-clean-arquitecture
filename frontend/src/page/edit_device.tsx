import FormInput from '../ui/text-field'
import { useStatus } from '../Hooks/useStatus'
import { Suspense } from 'react'
import { Select } from '../ui/select'
import { FormContainer } from '../components/FormContainer'
import { useEditDevice } from '../Hooks/useEditDevice'
import { useBrands } from '../Hooks/useBrand'
import { useModels } from '../Hooks/useModels'
import { useCategories } from '../Hooks/useCategories'
import { Button } from '../ui/button'

function EditDevice () {
  const { device, loading, handleChange, handleSubmit } = useEditDevice()
  const { categories } = useCategories()
  const { status } = useStatus()
  const { brands } = useBrands()
  const { models } = useModels()

  return (
    <FormContainer>
            <form action="submit" onSubmit={handleSubmit} className='w-[600px] h-screen flex justify-center border border-secondary'>
                <fieldset className='w-9/12 h-screen flex flex-col gap-5'>
                    <legend>Edita el Dispositivo</legend>
                    {loading && '...loading'}
                    {!loading && <>
                            <Suspense fallback='...Loading Select Options'>
                                <Select
                                    name='categories'
                                    value={device?.model.category.id}
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
                                    name='brands'
                                    value={device?.model.brand.id}
                                    label='Marca del Dispositivo'
                                    options={brands}
                                    onChange={handleChange}
                                    placeholder='-- Seleccione la Marca --'
                                />
                            </Suspense>
                            <Suspense fallback='...Loading Select Options'>
                                <Select
                                    name='models'
                                    value={device?.model.id}
                                    label='Modelo del Dispositivo'
                                    options={models}
                                    onChange={handleChange}
                                    placeholder='-- Seleccione el Modelo --'
                                />
                            </Suspense>
                    </>}
                    <div>
                        <Button
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
