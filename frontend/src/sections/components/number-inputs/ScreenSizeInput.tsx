import { lazy, Suspense, useLayoutEffect, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'
import { ScreenSize } from '../../../modules/devices/model/ModelCharacteristics/modelMonitor/ScreenSize'


interface Props {
  value: Primitives<ScreenSize>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const NumberInput = lazy(async () => import('./NumberInput').then(m => ({ default: m.NumberInput })))

export function ScreenSizeInput({ value = ScreenSize.MIN, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useLayoutEffect(() => {
    if (type !== 'form') return

    const isValid = ScreenSize.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ScreenSize.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])


  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <NumberInput
        name='screenSize'
        label='Tamaño de la Pantalla'
        isRequired={type === 'form'}
        value={value}
        onChange={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        error={isError}
        errorMessage={errorMessage}
        min={ScreenSize.MIN}
        max={ScreenSize.MAX}
      />
    </Suspense>
  )
}