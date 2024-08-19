import { lazy, useEffect, useRef, useState } from 'react'
import { DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'

interface Props {
  value: Primitives<DeviceActivo>
  onChange: OnHandleChange
  isForm?: boolean
}

const Input = lazy(async () => import('./Input').then(m => ({ default: m.Input })))

export default function ActivoInput({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = DeviceActivo.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceActivo.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [isForm, value])
  return (
    <>
      <Input
        id='activo'
        name='activo'
        type='text'
        label='Activo'
        isRequired={false}
        onChange={(event) => {
          // eslint-disable-next-line prefer-const
          let { name, value } = event.target
          value = value.trim().toUpperCase()
          onChange(name, value, Operator.CONTAINS)
        }}
        value={value}
        error={isError}
        errorMessage={errorMessage}
      />
    </>
  )
}