import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { EmployeeUserName } from '../../../modules/employee/employee/domain/UserName'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'
import { UserName } from '../../../modules/user/user/domain/UserName'

interface Props {
  value: Primitives<EmployeeUserName>
  onChange: OnHandleChange
  type?: 'form' | 'dialog' | 'search'
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({default: m.FormInput})))

export function EmployeeUserNameInput ({ value, onChange, type = 'search'}: Props) { 
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useLayoutEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = value.length < UserName.NAME_MIN_LENGTH
      return
    }

    const isValid = UserName.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : UserName.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
      isFirstInput.current = true
    }
  }, [value])
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
          id='userName'
          isRequired={type === 'form'}
          name="userName"
          type="text"
          label='Nombre de Usuario'
          placeholder='-- Ingrese el usuario --'
          handle={(event) => {
            const { name, value } = event.target
            onChange(name, value)
          }}
          value={value}
          isError={isError}
          errorMessage={errorMessage}
      />
    </Suspense>
  )
}
