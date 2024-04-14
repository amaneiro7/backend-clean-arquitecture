import { useEffect, useRef, useState } from 'react'
import FormInput from '../../../ui/text-field'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { EmployeeUserName } from '../../../../modules/employee/employee/domain/UserName'
import { type EmployeeName } from '../../../../modules/employee/employee/domain/Name'
import { type EmployeeLastName } from '../../../../modules/employee/employee/domain/LastName'

interface Props {
  value: Primitives<EmployeeUserName>
  name: Primitives<EmployeeName>
  lastName: Primitives<EmployeeLastName>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function EmployeeUserNameInput ({ value, name, lastName, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = EmployeeUserName.isValid(value, name, lastName)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : EmployeeUserName.invalidMessage(value, name, lastName))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='userName'
      isRequired={isForm}
      name="userName"
      type="text"
      label='Usuario'
      placeholder='-- Ingrese el usuario'
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
