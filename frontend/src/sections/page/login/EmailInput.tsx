import { lazy, Suspense, useEffect, useRef, useState} from 'react'
import { UserEmail } from '../../../modules/user/user/domain/UserEmail'
import { InputSkeletonLoading } from '../../components/skeleton/inputSkeletonLoading'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const FormInput = lazy(async () => import('../../components/text-inputs/FormInput').then(m => ({default: m.FormInput})))
export function EmailInput({ value, onChange, isRequired = true }: Props) {
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
    <Suspense fallback={<InputSkeletonLoading />}>
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

    </Suspense>
  )
}