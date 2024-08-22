import { lazy, useEffect, useRef, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { ComputerName } from '../../../modules/devices/fetures/computer/domain/ComputerName'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'

interface Props {
  value: Primitives<ComputerName>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function ComputerNameInput({ value, status, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isRequired, setIsRequired] = useState(true)

  useEffect(() => {
    if (type !== 'form') return    
    if ([
      StatusId.StatusOptions.INALMACEN,
      StatusId.StatusOptions.PORDESINCORPORAR,
      StatusId.StatusOptions.DESINCORPORADO,
      StatusId.StatusOptions.ASIGNADO
    ].includes(status)) {
      setIsRequired(false)
      setIsDisabled(true)
    } else {
      setIsRequired(true)
      setIsDisabled(false)
    }

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = ComputerName.isValid(value, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerName.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, type])

  return (
    <Input
      id='computerName'
      isRequired={isRequired}
      disabled={isDisabled}
      name='computerName'
      type='text'
      label='Nombre del equipo'
      onChange={(event) => {
          const { name, value } = event.target          
          const newValue = isDisabled ? '' : value.trim().toUpperCase()
          onChange(name, newValue, Operator.CONTAINS)
        }}
      value={value}
      error={isError}
      errorMessage={errorMessage}
    />
  )
}
