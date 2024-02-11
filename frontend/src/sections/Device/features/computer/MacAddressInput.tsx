import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../../ui/text-field'
import { MACAddress } from '../../../../modules/devices/fetures/computer/domain/MACAddress'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
}

const MacAddressInput: FC<Props> = ({ value, onChange, isForm = false }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = MACAddress.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MACAddress.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <FormInput
        id='macAddress'
        isRequired={isForm}
        name="macAddress"
        type="text"
        label='Direccion MAC'
        placeholder='-- Ingrese la MAC del equipo --'
        handle={onChange}
        value={value}
        isError={isError}
        errorMessage={errorMessage}
    />
  )
}

export default MacAddressInput
