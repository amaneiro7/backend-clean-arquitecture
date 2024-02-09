import { type FC } from 'react'
import FormInput from '../../../ui/text-field'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errorMessage: string
}

const HealthInput: FC<Props> = ({ value, onChange, errorMessage }) => {
  const isError = errorMessage.length > 0
  return (
  <FormInput
      id='health'
      name="health"
      type="text"
      label='Salud del Disco'
      placeholder='-- Ingrese el % de salud del Disco Duro --'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default HealthInput
