import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../../ui/text-field'
import { IPAddress } from '../../../../modules/devices/fetures/computer/domain/IPAddress'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
}

const IpAddressInput: FC<Props> = ({ value, onChange, isForm = false }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

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
        isRequired={isForm}
        name="ipAddress"
        type="text"
        label='Direccion IP'
        placeholder='-- Ingrese la IP del equipo --'
        handle={onChange}
        value={value}
        isError={isError}
        errorMessage={errorMessage}
    />
  )
}

export default IpAddressInput
