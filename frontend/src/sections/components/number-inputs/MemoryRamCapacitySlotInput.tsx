import { lazy, Suspense, useLayoutEffect, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'
import { MemoryRamValues } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'

interface Props {
  value: Primitives<MemoryRamValues>[]
  index: number
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const NumberInput = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function MemoryRamCapacitySlotInput({ value: memRam, index, onChange, type = 'form', status }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)  
  
  useLayoutEffect(() => {
    if (type !== 'form') return    
    const isValid = MemoryRamValues.isValid(memRam[index])

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamValues.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [memRam, status])  
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <NumberInput
        name='memoryRam'
        label={`Memoria Ram Slot ${index}`}
        // onChange={(event) => {
        //   const { name, value } = event.target
        //   onChange(name, value)
        // }}
        onChange={(event) => {
          const { name, value } = event.target
          const parsedValue = Number(value)
          if (!isNaN(parsedValue)) {
            const updatedMemoryRamSlot = [...memRam]
            updatedMemoryRamSlot[index] = parsedValue
            onChange(name, updatedMemoryRamSlot)            
          } else {
            console.error('El valor nos un número válido')
          }
        }}
        placeholder={`--- Ingrese la Capcacidad de Memoria del slot ${index} ---`}        
        value={memRam[index]}
        max={MemoryRamValues.max}
        min={MemoryRamValues.min}
        step={MemoryRamValues.minStep}        
        error={isError}
        errorMessage={errorMessage}
      />

    </Suspense>
  )
}