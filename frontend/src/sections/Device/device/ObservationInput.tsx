import { useEffect, useRef, useState } from 'react'
import FormInput from '../../ui/text-field'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { DeviceObservation } from '../../../modules/devices/devices/devices/domain/DeviceObservation'

interface Props {
  value: Primitives<DeviceObservation>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function ObservationInput ({ value, onChange, isForm = false }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = DeviceObservation.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceObservation.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <FormInput
        id='observation'
        isRequired={false}
        name="observation"
        type="textarea"
        label='Observacion'
        placeholder=''
        handle={(event) => {
          const { name, value } = event.target
          onChange(name, value, Operator.CONTAINS)
        }}
        value={value}
        isError={isError}
        errorMessage={errorMessage}
    />
  )
}
