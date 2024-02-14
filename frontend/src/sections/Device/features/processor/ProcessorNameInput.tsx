import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../../ui/text-field'
import { ProcessorName } from '../../../../modules/devices/fetures/processor/domain/ProcessorName'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isRequired?: boolean
}

const ProcessorNameInput: FC<Props> = ({ value, onChange, isRequired }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = ProcessorName.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ProcessorName.invalidMessage(value))

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
      placeholder='-- Ingrese el Nombre del Procesador'
      isRequired={isRequired}
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default ProcessorNameInput
