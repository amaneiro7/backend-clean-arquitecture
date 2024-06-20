import { lazy, useEffect, useLayoutEffect, useRef, useState } from 'react'
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

const FormInput = lazy(async () => import('./FormInput').then(m => ({default: m.FormInput})))

export function IpAddressInput({ value, status, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  const [isDisabled, setIsDisabled] = useState(false)
  useEffect(() => {
    if (type !== 'form') return
    setIsDisabled(status !== StatusId.StatusOptions.INUSE)


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

  useLayoutEffect(() => {
    if (isDisabled) {
      onChange('ipAddress', '')
    }
  }, [isDisabled])

  return (
    <FormInput
      id='ipAddress'
      name='ipAddress'
      type='text'
      label='Direccion IP'
      placeholder='-- Ingrese la IP del equipo --'
      isRequired={type === 'form' && !isDisabled}
      isDisabled={isDisabled}
      handle={(event) => {
          const { name, value } = event.target
          // value = value.replace(/\D/g, '').trim() // Remove non-numeric characters from input
          // value = value.replace(/(\d{3})(?=\d)/g, '$1.') // Add dots every 3 digits          
          const newValue = isDisabled ? '' : value
          onChange(name, newValue, Operator.CONTAINS)
        }}
      value={value ?? ''}
      isError={isError}
      errorMessage={errorMessage}
    />
  )
}
