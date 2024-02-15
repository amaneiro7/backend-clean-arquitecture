import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { UserPassword } from '../../../modules/user/user/domain/UserPassword'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const PasswordInput: FC<Props> = ({ value, onChange }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current || value.length === 0) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = UserPassword.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : UserPassword.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='password'
      name="password"
      type="password"
      label='Contraseña'
      placeholder='-- Ingrese la Contraseña --'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default PasswordInput
