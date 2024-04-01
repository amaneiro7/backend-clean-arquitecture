import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { DeviceActivo } from '../../../modules/devices/devices/devices/domain/DeviceActivo'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

interface Props {
  value: Primitives<DeviceActivo>
  onChange: OnHandleChange
  isForm?: boolean
}

const ActivoInput: FC<Props> = ({ value, onChange, isForm = false }) => {
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
    setErrorMessage(isValid ? '' : DeviceActivo.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='activo'
      name="activo"
      type="text"
      label='Activo'
      placeholder='-- Ingrese el Activo del equipo'
      isRequired={false}
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

export default ActivoInput
