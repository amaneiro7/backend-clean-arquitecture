import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { ModelName } from '../../../modules/devices/model/domain/ModelName'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'

interface Props {
  value: Primitives<ModelName>
  onChange: OnHandleChange
}

const ModelNameInput: FC<Props> = ({ value, onChange }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = ModelName.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ModelName.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
  <FormInput
      id='name'
      name="name"
      type="text"
      label='Name'
      placeholder='-- Ingrese el Nombre del Modelo'
      handle={(event) => {
        const { name, value } = event.target
        onChange(name, value)
      }}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default ModelNameInput
