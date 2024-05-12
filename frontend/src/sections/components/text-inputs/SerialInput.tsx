import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { DeviceSerial } from '../../../modules/devices/devices/devices/domain/DeviceSerial'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: Primitives<DeviceSerial>
  onChange: OnHandleChange
  type?: 'form' | 'search'
  isAdd?: boolean
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({ default: m.FormInput })))
const ReadOnlyInputBox = lazy(async () => import("../ReadOnlyInputBox").then(m => ({ default: m.ReadOnlyInputBox })))

export default function SerialInput({ value, onChange, type = 'search', isAdd = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (type !== 'form') return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value.length <= DeviceSerial.NAME_MIN_LENGTH
      return
    }

    const isValid = DeviceSerial.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceSerial.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      {(!isAdd && type === 'form') ?
        <ReadOnlyInputBox label="Serial" value={value} required />
        : <FormInput
          id='serial'
          isRequired={type === 'form'}
          name="serial"
          type="text"
          label='Serial'
          placeholder='-- Ingrese el Serial del equipo'
          handle={(event) => {
            let { name, value } = event.target
            value = value.trim().toUpperCase()
            onChange(name, value, Operator.CONTAINS)
          }}
          value={value}
          isError={isError}
          errorMessage={errorMessage}
        />}

    </Suspense>
  )
}
