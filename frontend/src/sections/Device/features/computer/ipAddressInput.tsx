import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../../ui/text-field'
import { IPAddress } from '../../../../modules/devices/fetures/computer/domain/IPAddress'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'

interface Props {
  value: Primitives<IPAddress>
  onChange: OnHandleChange
  isForm?: boolean
  isRequired?: boolean
}

const IpAddressInput: FC<Props> = ({ value, onChange, isForm = false, isRequired }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm || value === '') return

    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = IPAddress.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : IPAddress.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <FormInput
        id='ipAddress'
        name="ipAddress"
        type="text"
        label='Direccion IP'
        placeholder='-- Ingrese la IP del equipo --'
        isRequired={isRequired}
        handle={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        value={value ?? ''}
        isError={isError}
        errorMessage={errorMessage}
    />
  )
}

export default IpAddressInput
