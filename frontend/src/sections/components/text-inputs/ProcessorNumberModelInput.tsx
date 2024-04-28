import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ProcessorName } from '../../../modules/devices/fetures/processor/domain/ProcessorName'
import { OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputSkeletonLoading } from '../Loading/inputSkeletonLoading'

interface Props {
  value: string
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('../../ui/text-field'))

export default function ProcessorNumberModelInput({ value, onChange, type = 'form' }: Props) {
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
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
        id='numberModel'
        name="numberModel"
        type="text"
        label='Numero de modelo del procesador' 
        placeholder='-- Ingrese el numero de Modelo'
        isRequired={type === 'form'}
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