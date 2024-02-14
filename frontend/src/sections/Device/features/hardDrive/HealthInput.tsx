import { useEffect, useRef, useState, type FC } from 'react'
import { HardDriveHealth } from '../../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import NumberInput from '../../../ui/number-field'

interface Props {
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
  isRequired?: boolean
}

const HealthInput: FC<Props> = ({ value, onChange, isForm = false, isRequired }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current) {
      isFirstInput.current = value === 0
      return
    }

    const isValid = HardDriveHealth.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : HardDriveHealth.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <NumberInput
      name='health'
      label='Health'
      onChange={onChange}
      placeholder='--- Ingrese el estado de salud del Disco ---'
      value={value}
      isRequired={isRequired}
      max={HardDriveHealth.NAME_MAX_LENGTH}
      min={HardDriveHealth.NAME_MIN_LENGTH}
      error={isError}
      errorMessage={errorMessage}
    />
  )
}

export default HealthInput
