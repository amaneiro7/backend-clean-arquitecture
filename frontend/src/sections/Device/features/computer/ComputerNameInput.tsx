import { useEffect, useRef, useState } from 'react'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { ComputerName } from '../../../../modules/devices/fetures/computer/domain/ComputerName'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import FormInput from '../../../ui/text-field'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'

interface Props {
  value: Primitives<ComputerName>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function ComputerNameInput ({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = ComputerName.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerName.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='computerName'
      isRequired={isForm}
      name="computerName"
      type="text"
      label='Nombre del equipo'
      placeholder='-- Ingrese el Nombre del equipo'
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
