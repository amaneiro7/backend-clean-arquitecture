import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { BrandName } from '../../../modules/devices/brand/domain/BrandName'

interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const BrandNameInput: FC<Props> = ({ value, onChange }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = BrandName.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : BrandName.invalidMessage(value))

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
      placeholder='-- Ingrese el Nombre de la Marca'
      handle={onChange}
      value={value}
      isError={isError}
      errorMessage={errorMessage}
  />
  )
}

export default BrandNameInput
