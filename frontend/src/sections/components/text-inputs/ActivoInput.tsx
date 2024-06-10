import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: Primitives<DeviceActivo>
  onChange: OnHandleChange
  isForm?: boolean
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({ default: m.FormInput })))

export default function ActivoInput({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [inputValue, setInputValue] = useState(value)
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useLayoutEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || inputValue === '') {
      isFirstInput.current = inputValue === ''
      return
    }

    const isValid = DeviceActivo.isValid(inputValue)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceActivo.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [isForm, inputValue])
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
        id='activo'
        name='activo'
        type='text'
        label='Activo'
        placeholder='-- Ingrese el Activo del equipo'
        isRequired={false}
        handle={(event) => {
          // eslint-disable-next-line prefer-const
          let { name, value } = event.target
          value = value.trim().toUpperCase()
          setInputValue(value)
          onChange(name, value, Operator.CONTAINS)
        }}
        value={inputValue}
        isError={isError}
        errorMessage={errorMessage}
      />
    </Suspense>
  )
}