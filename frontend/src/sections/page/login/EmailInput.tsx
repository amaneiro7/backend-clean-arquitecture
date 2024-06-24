import { lazy, useEffect, useRef, useState } from 'react'
import { UserEmail } from '../../../modules/user/user/domain/UserEmail'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const Input = lazy(async () => import('../../components/text-inputs/Input').then(m => ({ default: m.Input })))

export function EmailInput({ value, onChange, isRequired = true }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  
  useEffect(() => {
    if (isFirstInput.current || value === '') {
      isFirstInput.current = !value.includes('@')
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
    <Input
      name='email'
      type='email'
      label='Correo Electrónico'
      onChange={onChange}
      value={value}
      error={isError}
      errorMessage={errorMessage}
      isRequired={isRequired}
    />
  )
}