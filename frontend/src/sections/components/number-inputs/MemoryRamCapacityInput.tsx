import { lazy, Suspense, useLayoutEffect, useMemo, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'
import { MemoryRamValues } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { MemoryRam } from '../../../modules/devices/fetures/computer/domain/MemoryRam'

interface Props {
  value: Primitives<MemoryRamValues>
  memoryRam: Primitives<MemoryRamValues>[]
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const NumberInput = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function MemoryRamCapacityInput({ value, memoryRam, onChange, type = 'form', status }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)  
  
  useLayoutEffect(() => {
    if (type !== 'form') return

    const isValid = MemoryRam.isValid(memoryRam, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRam.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status])

  const updateValue = useMemo(() => {
    const value = MemoryRam.totalAmount(memoryRam)
    onChange('memoryRamCapacity', value)
    return value
  },[memoryRam])


  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <NumberInput
        name='memoryRamCapacity'
        label='Capacidad Total de Memoria Ram'
        placeholder='--- Ingrese la Capcacidad de Memoria ---'
        isRequired={type === 'form'}
        value={updateValue}
        error={isError}
        readOnly        
        errorMessage={errorMessage}
      />

    </Suspense>
  )
}