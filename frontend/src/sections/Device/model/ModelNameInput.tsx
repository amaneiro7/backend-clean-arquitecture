import { type FC } from 'react'
import FormInput from '../../ui/text-field'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errorMessage: string
}

const ModelNameInput: FC<Props> = ({ value, onChange, errorMessage }) => {
  const isError = errorMessage.length > 0
  return (
  <FormInput
      id='name'
      name="name"
      type="text"
      label='Name'
      placeholder='-- Ingrese el Nombre del Modelo'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default ModelNameInput
