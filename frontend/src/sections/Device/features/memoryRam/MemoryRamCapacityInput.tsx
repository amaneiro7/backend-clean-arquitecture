import { useEffect, useRef, useState, type FC } from 'react'
import { MemoryRamCapacity } from '../../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import NumberInput from '../../../ui/number-field'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../../modules/devices/devices/status/domain/StatusId'

interface Props {
  value: Primitives<MemoryRamCapacity>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  isForm?: boolean
}

const MemoryRamCapacityInput: FC<Props> = ({ value, onChange, isForm = true, status }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current) {
      isFirstInput.current = value === 0
      return
    }

    const isValid = MemoryRamCapacity.isValid(value, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamCapacity.invalidMessage())

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
      isRequired={isForm}
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
