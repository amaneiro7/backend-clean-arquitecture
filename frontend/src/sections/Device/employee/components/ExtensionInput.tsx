import { useEffect, useRef, useState } from 'react'
import FormInput from '../../../components/text-inputs/FormInput'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { Extension } from '../../../../modules/employee/employee/domain/Extension'

interface Props {
  value: Primitives<Extension>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function ExtensionInput ({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = Extension.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : Extension.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='extension'
      isRequired={isForm}
      name="extension"
      type="tel"
      label='Número de extensión'
      placeholder='-- Ingrese el Nombre del usuario'
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
