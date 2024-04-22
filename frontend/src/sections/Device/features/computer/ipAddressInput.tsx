import { useEffect, useRef, useState } from 'react'
import FormInput from '../../../ui/text-field'
import { IPAddress } from '../../../../modules/devices/fetures/computer/domain/IPAddress'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { StatusId } from '../../../../modules/devices/devices/status/domain/StatusId'

interface Props {
  value: Primitives<IPAddress>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function IpAddressInput ({ value, status, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    if (!isForm) return
    handleDisabled()

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
  }, [value, status])
  const handleDisabled = () => {
    const name = 'ipAddress'
    const value = ''
    if (status === '') {
      onChange(name, value)
      setIsDisabled(true)
      return
    }
    if (status !== StatusId.StatusOptions.INUSE) {
      onChange(name, value)
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }
  return (
    <FormInput
        id='ipAddress'
        name="ipAddress"
        type="text"
        label='Direccion IP'
        placeholder='-- Ingrese la IP del equipo --'
        isRequired={isForm && !isDisabled}
        isDisabled={isDisabled}
        handle={(event) => {
          const { name, value } = event.target
          const newValue = isDisabled ? '' : value
          onChange(name, newValue)
        }}
        value={value ?? ''}
        isError={isError}
        errorMessage={errorMessage}
    />
  )
}
