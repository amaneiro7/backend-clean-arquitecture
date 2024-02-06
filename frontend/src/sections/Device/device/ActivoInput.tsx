import { type FC } from 'react'
import FormInput from '../../ui/text-field'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errorMessage?: string
}

const ActivoInput: FC<Props> = ({ value, onChange, errorMessage }) => {
  const isError = errorMessage !== undefined && errorMessage.length > 0
  return (
  <FormInput
      id='activo'
      name="activo"
      type="text"
      label='Activo'
      placeholder='-- Ingrese el Activo del equipo'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default ActivoInput
