import { useEffect, useRef, useState, type FC } from 'react'
import { MemoryRamCapacity } from '../../../../modules/devices/fetures/memoryRam/memoryRamCapacity/MemoryRamCapacity'
import NumberInput from '../../../ui/number-field'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'

interface Props {
  value: number
  onChange: OnHandleChange
  isForm?: boolean
  isRequired?: boolean
}

const MemoryRamCapacityInput: FC<Props> = ({ value, onChange, isForm = true, isRequired }) => {
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
      onChange={(event) => {
        const { name, value } = event.target
        onChange(name, value)
      }}
      placeholder='--- Ingrese la Capcacidad de Memoria ---'
      isRequired={isRequired}
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
