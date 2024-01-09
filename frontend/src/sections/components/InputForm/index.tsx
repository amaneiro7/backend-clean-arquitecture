import { Suspense, lazy } from 'react'
import { type InputFormTypeReturn } from '../../../types/types'
import { AddIcon } from '../../ui/icon/AddIcon.tsx'
import { Link } from 'react-router-dom'
import { EditIcon } from '../../ui/icon/EditIcon.tsx'

const Select = lazy(async () => await import('../../ui/select/index.tsx'))
const FormInput = lazy(async () => await import('../../ui/text-field/index.tsx'))
interface Props {
  inputsForm: InputFormTypeReturn[]
}

const InputForm = ({
  inputsForm
}: Props) => {
  const routes = {
    brandId: 'brand',
    modelId: 'model'
  }
  return (
        <>
          {inputsForm.map((input, index) => {
            if (input.type === 'select') {
              return (
                <div key={index} className='w-full flex relative'>
                  <Suspense>
                    {routes[input.name] &&
                      <Link
                        className='absolute -left-11'
                        to={`/${routes[input.name]}/add`}
                      >
                        <AddIcon />
                      </Link>}
                    <Select
                        name={input.name}
                        value={input.value}
                        label={input.label}
                        options={input.options}
                        onChange={input.onChange}
                        placeholder={input.placeholder}
                    />
                    {routes[input.name] &&
                      <Link
                        className='absolute -right-11'
                        to={`/${routes[input.name]}/edit/${input.value}`}
                        state={{}}
                      >
                        <EditIcon
                          isDisbaled={input.value === ''}
                        />
                      </Link>}
                  </Suspense>
                </div>
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
