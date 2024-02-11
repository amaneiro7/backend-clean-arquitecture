import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSeria'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
}

const SerialInput: FC<Props> = ({ value, onChange, isForm = false }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = DeviceSerial.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceSerial.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='serial'
      isRequired={isForm}
      name="serial"
      type="text"
      label='Serial'
      placeholder='-- Ingrese el Serial del equipo'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default SerialInput
