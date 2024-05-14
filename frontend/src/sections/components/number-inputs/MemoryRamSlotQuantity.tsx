import { lazy, Suspense, useLayoutEffect, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { MemoryRamSlotQuantity } from '../../../modules/devices/model/ModelCharacteristics/modelComputer/MemoryRamSlotQuantity'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'


interface Props {
  value: Primitives<MemoryRamSlotQuantity>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const NumberInput = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function MemoryRamSlotQuantityInput({ value = MemoryRamSlotQuantity.MIN, onChange, type = 'form' }: Props) {
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
  }, [value])


  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <NumberInput
        name='memoryRamSlotQuantity'
        label='Cantidad de Ranuras'
        isRequired={type === 'form'}
        value={value}
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        error={isError}
        errorMessage={errorMessage}
        min={MemoryRamSlotQuantity.MIN}
        max={MemoryRamSlotQuantity.MAX}
      />
    </Suspense>
  )
}