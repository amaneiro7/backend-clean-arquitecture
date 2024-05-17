import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: string
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({default: m.FormInput})))

export function LocationNameInpu222t({ value, onChange, type ='search' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (type !== 'form') return

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = false

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : 'error')

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
          id='locationName'
          isRequired={type === 'form'}
          name="name"
          type="text"
          label='Nombre del Sitio'
          placeholder='-- Ingrese el Serial del equipo --'
          handle={(event) => {
            let { name, value } = event.target
            value = value.trim().toUpperCase()
            onChange(name, value, Operator.CONTAINS)
          }}
          value={value}
          isError={isError}
          errorMessage={errorMessage}
      />

    </Suspense>
  )
}