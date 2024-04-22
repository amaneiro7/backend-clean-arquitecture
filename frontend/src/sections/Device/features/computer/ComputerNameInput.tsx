import { useEffect, useRef, useState } from 'react'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { ComputerName } from '../../../../modules/devices/fetures/computer/domain/ComputerName'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import FormInput from '../../../ui/text-field'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { StatusId } from '../../../../modules/devices/devices/status/domain/StatusId'

interface Props {
  value: Primitives<ComputerName>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function ComputerNameInput ({ value, status, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (!isForm) return
    handleDisabled()

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = ComputerName.isValid(value, status)
    setIsDisabled(status !== StatusId.StatusOptions.INUSE)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerName.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status])
  const handleDisabled = () => {
    if (status === '') {
      setIsDisabled(true)
      return
    }
    if (status !== StatusId.StatusOptions.INUSE) {
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }
  return (
  <FormInput
      id='computerName'
      isRequired={!isDisabled && isForm}
      isDisabled={isDisabled}
      name="computerName"
      type="text"
      label='Nombre del equipo'
      placeholder='-- Ingrese el Nombre del equipo'
      handle={(event) => {
        const { name, value } = event.target
        const newValue = isDisabled ? '' : value
        onChange(name, newValue, Operator.CONTAINS)
      }}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}
