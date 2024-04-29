import { useEffect, useRef, useState } from 'react'
import FormInput from '../../../components/text-inputs/FormInput'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { EmployeeEmail } from '../../../../modules/employee/employee/domain/EmployeeEmail'

interface Props {
  value: Primitives<EmployeeEmail>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function EmployeeEmailInput ({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = EmployeeEmail.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : EmployeeEmail.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='email'
      isRequired={isForm}
      name="email"
      type="email"
      label='Correo Electronico'
      placeholder='-- Ingrese el Correo Eléctronico del usuario'
      handle={(event) => {
        const { name, value } = event.target
        onChange(name, value, Operator.CONTAINS)
      }}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}
