import { lazy, Suspense, useLayoutEffect, useState } from 'react'
import { MemoryRamCapacity } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamCapacity'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: number
  index: number
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const NumberInput = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function MemoryRamCapacitySlotInput({ value, index, onChange, type = 'form', status }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)  
  
  useLayoutEffect(() => {
    if (type !== 'form') return
    console.log('index',value)
    const isValid = MemoryRamCapacity.isValid(value, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamCapacity.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status])  
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <NumberInput
        name='memoryRamSlot'
        label={`Memoria Ram Slot ${index}`}
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        placeholder={`--- Ingrese la Capcacidad de Memoria del slot ${index} ---`}
        isRequired={type === 'form'}
        value={value}
        max={MemoryRamCapacity.max}
        min={MemoryRamCapacity.min}
        step={MemoryRamCapacity.minStep}
        error={isError}
        errorMessage={errorMessage}
      />

    </Suspense>
  )
}