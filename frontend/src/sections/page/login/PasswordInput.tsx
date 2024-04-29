import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../components/text-inputs/FormInput'
import { UserPassword } from '../../../modules/user/user/domain/UserPassword'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const PasswordInput: FC<Props> = ({ value, onChange, isRequired = true }) => {
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
    setErrorMessage(isValid ? '' : UserPassword.invalidMessage())

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
      isRequired={isRequired}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default PasswordInput
