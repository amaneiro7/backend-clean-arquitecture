import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../../ui/text-field'
import { MACAddress } from '../../../../modules/devices/fetures/computer/domain/MACAddress'

interface Props {
  value: string | null
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
  isRequired?: boolean
}

const MacAddressInput: FC<Props> = ({ value, onChange, isForm = false, isRequired }) => {
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
        name="macAddress"
        type="text"
        label='Direccion MAC'
        placeholder='-- Ingrese la MAC del equipo --'
        isRequired={isRequired}
        handle={onChange}
        value={value ?? ''}
        isError={isError}
        errorMessage={errorMessage}
    />
  )
}

export default MacAddressInput
