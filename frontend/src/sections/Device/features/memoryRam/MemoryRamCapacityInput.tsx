import { useEffect, useRef, useState, type FC } from 'react'
import { MemoryRamCapacity } from '../../../../modules/devices/fetures/memoryRam/memoryRamCapacity/MemoryRamCapacity'
import NumberInput from '../../../ui/number-field'

interface Props {
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isForm?: boolean
}

const MemoryRamCapacityInput: FC<Props> = ({ value, onChange, isForm = true }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current) {
      isFirstInput.current = value === 0
      return
    }

    const isValid = MemoryRamCapacity.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamCapacity.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <NumberInput
      name='memoryRamCapacity'
      label='Memoria Ram'
      onChange={onChange}
      placeholder='--- Ingrese la Capcacidad de Memoria ---'
      value={value}
      max={MemoryRamCapacity.max}
      min={MemoryRamCapacity.min}
      step={MemoryRamCapacity.minStep}
      error={isError}
      errorMessage={errorMessage}
    />
  )
}

export default MemoryRamCapacityInput
