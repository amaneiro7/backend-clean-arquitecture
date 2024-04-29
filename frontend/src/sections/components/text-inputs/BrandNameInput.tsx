import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrandName } from '../../../modules/devices/brand/domain/BrandName'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { InputSkeletonLoading } from '../Loading/inputSkeletonLoading'

interface Props {
  value: Primitives<BrandName>
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({default: m.FormInput})))

export default function BrandNameInput ({ value, onChange, type = 'form' }: Props) {
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
    <Suspense fallback={<InputSkeletonLoading/>}>
      <FormInput
          id='name'
          name="name"
          type="text"
          label='Name'
          isRequired={type === 'form'}
          placeholder='-- Ingrese el Nombre de la Marca --'
          handle={(event) => {
            const { name, value } = event.target
            onChange(name, value)
          }}
          value={value}
          isError={isError}
          errorMessage={errorMessage}
      />
    </Suspense>
  )
}
