import FormInput from '../../ui/text-field'
import { Suspense } from 'react'
import { Select } from '../../ui/select'
import { useFormDevice } from '../../Hooks/useFormDevice'
import { Button } from '../../ui/button'
import { FormContainer } from '../../components/formContainer'

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

  type InpustFormType = InpustFormSelect | InpustFormText
  interface InpustFormSelect {
    type: 'select'
    options: never[]
    name: string
    value: string
    label: string
    onChange: any
    placeholder: string
  }
  interface InpustFormText {
    type: 'text'
    name: string
    value: string
    label: string
    onChange: (event: any) => void
    placeholder: string
  }

  const inputsForm: InpustFormType[] = [
    {
      type: 'select',
      name: 'categoryId',
      value: device?.categoryId,
      label: 'Categoria del Dispositivo',
      options: categories,
      onChange: handleChange,
      placeholder: '-- Seleccione la Categoria --'
    },
    {
      type: 'text',
      name: 'serial',
      label: 'Serial',
      placeholder: device?.serial,
      value: device?.serial,
      onChange: handleChange
    },
    {
      type: 'text',
      name: 'activo',
      label: 'Activo',
      placeholder: device?.activo,
      value: device?.activo,
      onChange: handleChange
    },
    {
      type: 'select',
      name: 'status',
      value: device?.status,
      label: 'Estado del Dispositivo',
      options: status,
      onChange: handleChange,
      placeholder: '-- Seleccione el Estado --'
    },
    {
      type: 'select',
      name: 'brandId',
      value: device?.brandId,
      label: 'Marca del Dispositivo',
      options: brands,
      onChange: handleChange,
      placeholder: '-- Seleccione la Marca --'
    },
    {
      type: 'select',
      name: 'modelId',
      value: device?.modelId,
      label: 'Modelo del Dispositivo',
      options: models,
      onChange: handleChange,
      placeholder: '-- Seleccione el Modelo --'
    }
  ]

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
                        {inputsForm.map((input, index) => {
                          if (input.type === 'select') {
                            return (
                                <Suspense key={index} fallback='...Loading Select Options'>
                                <Select

                                    name={input.name}
                                    value={input.value}
                                    label={input.label}
                                    options={input.options}
                                    onChange={input.onChange}
                                    placeholder={input.placeholder}
                                />
                            </Suspense>
                            )
                          } else if (input.type === 'text') {
                            return (
                                <FormInput
                                key={index}
                                name={input.name}
                                type={input.type}
                                label={input.label}
                                placeholder={input.placeholder}
                                value={input.value}
                                handle={input.onChange}
                            />
                            )
                          } else {
                            return null
                          }
                        })}
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

export default DeviceForm
