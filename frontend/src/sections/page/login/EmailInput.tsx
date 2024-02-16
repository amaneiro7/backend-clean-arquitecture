import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { UserEmail } from '../../../modules/user/user/domain/UserEmail'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const EmailInput: FC<Props> = ({ value, onChange, isRequired = true }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current || value.length === 0) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = UserEmail.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : UserEmail.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='email'
      name="email"
      type="email"
      label='Correo Electrónico'
      placeholder='-- Ingrese el Correo Electrónico --'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
      isRequired={isRequired}
  />
  )
}

export default EmailInput
