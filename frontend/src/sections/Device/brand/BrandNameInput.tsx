import { useEffect, useRef, useState, type FC } from 'react'
import FormInput from '../../ui/text-field'
import { BrandName } from '../../../modules/devices/brand/domain/BrandName'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'

interface Props {
  value: Primitives<BrandName>
  onChange: OnHandleChange
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

export default BrandNameInput
