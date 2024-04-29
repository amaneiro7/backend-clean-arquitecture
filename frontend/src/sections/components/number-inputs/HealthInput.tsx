import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { HardDriveHealth } from '../../../modules/devices/fetures/hardDrive/hardDrive/domain/HardDriveHealth'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { InputSkeletonLoading } from '../Loading/inputSkeletonLoading'

interface Props {
  value: Primitives<HardDriveHealth>
  onChange: OnHandleChange
  isForm?: boolean
  isRequired?: boolean
}

const NumberInput = lazy(async () => await import('../../ui/number-field').then(m => ({ default: m.NumberInput })))

export function HealthInput({ value, onChange, isForm = false, isRequired }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current) {
      isFirstInput.current = value === 0
      return
    }

    const isValid = HardDriveHealth.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : HardDriveHealth.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <NumberInput
        name='health'
        label='Health'
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        placeholder='--- Ingrese el estado de salud del Disco ---'
        value={value}
        isRequired={isRequired}
        max={HardDriveHealth.NAME_MAX_LENGTH}
        min={HardDriveHealth.NAME_MIN_LENGTH}
        error={isError}
        errorMessage={errorMessage}
      />
    </Suspense>
  )
}
