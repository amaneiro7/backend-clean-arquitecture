import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { ModelName } from '../../../modules/devices/model/domain/ModelName'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
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
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default ModelNameInput
