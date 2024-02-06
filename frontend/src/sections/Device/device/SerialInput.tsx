import { type FC } from 'react'
import FormInput from '../../ui/text-field'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  errorMessage?: string
}

const SerialInput: FC<Props> = ({ value, onChange, errorMessage }) => {
  const isError = errorMessage !== undefined && errorMessage.length > 0
  return (
  <FormInput
      id='serial'
      name="serial"
      type="text"
      label='Serial'
      placeholder='-- Ingrese el Serial del equipo'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default SerialInput
