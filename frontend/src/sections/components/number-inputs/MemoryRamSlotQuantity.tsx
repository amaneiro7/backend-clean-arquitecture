import { lazy, useLayoutEffect, useState } from 'react'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { MemoryRamSlotQuantity } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'



interface Props {
  value: Primitives<MemoryRamSlotQuantity>
  type?: 'form' | 'search'
}

const Input = lazy(async () => import('../text-inputs/Input').then(m => ({ default: m.Input })))

export function MemoryRamSlotQuantityInput({ value = MemoryRamSlotQuantity.MIN, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useLayoutEffect(() => {
    if (type !== 'form') return

    const isValid = MemoryRamSlotQuantity.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MemoryRamSlotQuantity.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [type, value])

  return (
    <Input
      name='memoryRamSlotQuantity'
      label='Cantidad de Ranuras'
      isRequired={type === 'form'}
      type='number'
      value={value}
      error={isError}
      errorMessage={errorMessage}
      min={MemoryRamSlotQuantity.MIN}
      max={MemoryRamSlotQuantity.MAX}
    />    
  )
}