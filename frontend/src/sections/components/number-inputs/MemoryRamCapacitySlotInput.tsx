import { lazy, useEffect, useState } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type Event } from '../../../modules/shared/domain/types/types'
import { MemoryRamValues } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'

interface Props {
  value: Primitives<MemoryRamValues>
  index: number
  status?: Primitives<StatusId>
  type?: 'form' | 'search'
  onChange: (value: string, index: number) => void
}

const Input = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function MemoryRamCapacitySlotInput({ value, index, onChange, type = 'form', status }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (type !== 'form') return
    console.log(`memRam${[index]}`)
    const isValid = MemoryRamValues.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamValues.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [index, value, status, type])

  return (
    <Input
      name='memoryRam'
      label={`Memoria Ram Slot ${index}`}
      type='number'
      value={value}
      onChange={(event: Event) => {
        const { value } = event.target
        onChange(value, index)
      }}
      max={MemoryRamValues.max}
      min={MemoryRamValues.min}
      step={MemoryRamValues.minStep * 2}
      error={isError}
      errorMessage={errorMessage}
    />
  )
}