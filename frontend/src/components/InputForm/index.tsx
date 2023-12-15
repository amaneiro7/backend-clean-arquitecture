import { Suspense, lazy } from 'react'
import { type InpustFormType } from '../../types/types'

const Select = lazy(async () => await import('../../ui/select'))
const FormInput = lazy(async () => await import('../../ui/text-field'))

const InputForm = ({
  device,
  categories,
  brands,
  models,
  status,
  onChange
}) => {
  const inputsForm: InpustFormType[] = [
    {
      type: 'select',
      name: 'categoryId',
      value: device?.categoryId,
      label: 'Categoria del Dispositivo',
      options: categories,
      onChange,
      placeholder: '-- Seleccione la Categoria --'
    },
    {
      type: 'text',
      name: 'serial',
      label: 'Serial',
      placeholder: device?.serial,
      value: device?.serial,
      onChange
    },
    {
      type: 'text',
      name: 'activo',
      label: 'Activo',
      placeholder: device?.activo,
      value: device?.activo,
      onChange
    },
    {
      type: 'select',
      name: 'status',
      value: device?.status,
      label: 'Estado del Dispositivo',
      options: status,
      onChange,
      placeholder: '-- Seleccione el Estado --'
    },
    {
      type: 'select',
      name: 'brandId',
      value: device?.brandId,
      label: 'Marca del Dispositivo',
      options: brands,
      onChange,
      placeholder: '-- Seleccione la Marca --'
    },
    {
      type: 'select',
      name: 'modelId',
      value: device?.modelId,
      label: 'Modelo del Dispositivo',
      options: models,
      onChange,
      placeholder: '-- Seleccione el Modelo --'
    }
  ]

  return (
        <>
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
                <Suspense key={index}>
                    <FormInput
                        name={input.name}
                        type={input.type}
                        label={input.label}
                        placeholder={input.placeholder}
                        value={input.value}
                        handle={input.onChange}
                    />
                </Suspense>
            )
          } else {
            return null
          }
        })}
        </>
  )
}
export default InputForm
