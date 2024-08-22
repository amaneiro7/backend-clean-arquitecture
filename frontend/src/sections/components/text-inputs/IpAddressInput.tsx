import { lazy, useEffect, useRef, useState } from 'react'
import { IPAddress } from '../../../modules/devices/fetures/computer/domain/IPAddress'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

interface Props {
  value: Primitives<IPAddress>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const Input = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function IpAddressInput({ value, status, onChange, type = 'form' }: Props) {
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
    ].includes(status)) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    if ([StatusId.StatusOptions.INUSE].includes(status) && type === 'form') {
      setIsRequired(true)
    } else {
      setIsRequired(false)
    }


    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = IPAddress.isValid(value, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : IPAddress.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, type])


  return (
    <Input
      id='ipAddress'
      name='ipAddress'
      type='text'
      label='Direccion IP'
      isRequired={isRequired}
      disabled={isDisabled}
      onChange={(event) => {
          const { name, value } = event.target
          // value = value.replace(/\D/g, '').trim() // Remove non-numeric characters from input
          // value = value.replace(/(\d{3})(?=\d)/g, '$1.') // Add dots every 3 digits          
          const newValue = isDisabled ? '' : value
          onChange(name, newValue, Operator.CONTAINS)
        }}
      value={value ?? ''}
      error={isError}
      errorMessage={errorMessage}
    />
  )
}