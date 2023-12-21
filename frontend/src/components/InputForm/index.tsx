import { Suspense, lazy } from 'react'
import { type InputFormTypeReturn } from '../../types/types'

const Select = lazy(async () => await import('../../ui/select'))
const FormInput = lazy(async () => await import('../../ui/text-field'))
interface Props {
  inputsForm: InputFormTypeReturn[]
}

const InputForm = ({
  inputsForm
}: Props) => {
  return (
        <>
        {inputsForm.map((input, index) => {
          if (input.type === 'select') {
            return (
                  <Suspense key={index}>
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
