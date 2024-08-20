import { lazy, useEffect, useState } from 'react'
import { MemoryRamValues } from '../../../modules/devices/fetures/memoryRam/memoryRamCapacity/domain/MemoryRamValue'
import { MemoryRam } from '../../../modules/devices/fetures/computer/domain/MemoryRam'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type StatusId } from '../../../modules/devices/devices/status/domain/StatusId'

interface Props {
  value: Primitives<MemoryRamValues>
  memoryRam: Primitives<MemoryRamValues>[]
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const Input = lazy(async () => import('../text-inputs/Input').then(m => ({ default: m.Input })))

export function MemoryRamCapacityInput({ value, memoryRam,  type = 'form', status }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  
  useEffect(() => {
    if (type !== 'form') return

    const isValid = MemoryRam.isValid(memoryRam, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRam.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, type, memoryRam])

  return (    
    <Input
      name='memoryRamCapacity'
      label='Total Memoria Ram'
      isRequired={type === 'form'}
      value={value}
      error={isError}
      errorMessage={errorMessage}
      type='number'
      readOnly
      aria-readonly
      tabIndex={-1}
      onMouseDown={(e) => { e.preventDefault() }}
    />
    
  )
}