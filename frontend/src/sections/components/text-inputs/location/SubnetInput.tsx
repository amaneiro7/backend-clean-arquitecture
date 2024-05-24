import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Subnet } from '../../../../modules/location/locations/domain/Subnet'
import { InputSkeletonLoading } from '../../skeleton/inputSkeletonLoading'

interface Props {
  value: Primitives<Subnet>  
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./../FormInput').then(m => ({default: m.FormInput})))

export function SubnetInput({ value, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  
  
  useLayoutEffect(() => {
    if (type !== 'form') return

    if (isFirstInput.current) {
      isFirstInput.current = value?.length === 12
      return
    }

    const isValid = Subnet.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : Subnet.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  

  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
        id='subnet'
        name="subnet"
        type="text"
        label='Subnet'
        placeholder='-- Ingrese la Subnet del Sitio --'
        isRequired={false}        
        handle={(event) => {
          const { name, value } = event.target
          // value = value.replace(/\D/g, '').trim() // Remove non-numeric characters from input
          // value = value.replace(/(\d{3})(?=\d)/g, '$1.') // Add dots every 3 digits          
          
          onChange(name, value)
        }}
        value={value}
        isError={isError}
        errorMessage={errorMessage}
      />
    </Suspense>
  )
}
