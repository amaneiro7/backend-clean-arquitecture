import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { UserPassword } from '../../../modules/user/user/domain/UserPassword'
import { InputSkeletonLoading } from '../../components/Loading/inputSkeletonLoading'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const FormInput = lazy(async () => import('../../components/text-inputs/FormInput').then(m => ({ default: m.FormInput })))

export function PasswordInput({ value, onChange, isRequired = true }: Props) {
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
    <Suspense fallback={<InputSkeletonLoading />}>
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

    </Suspense>
  )
}