import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { ComputerName } from '../../../modules/devices/fetures/computer/domain/ComputerName'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: Primitives<ComputerName>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({default: m.FormInput})))

export function ComputerNameInput({ value, status, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (type !== 'form') return    
    if (status !== StatusId.StatusOptions.INUSE) {
      onChange('computerName', '')
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }

    if (isFirstInput.current || value === '') {
      isFirstInput.current = value === ''
      return
    }

    const isValid = ComputerName.isValid(value, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerName.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, type])

  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
        id='computerName'
        isRequired={!isDisabled && type === 'form'}
        isDisabled={isDisabled}
        name='computerName'
        type='text'
        label='Nombre del equipo'
        placeholder='-- Ingrese el Nombre del equipo'
        handle={(event) => {
          const { name, value } = event.target          
          const newValue = isDisabled ? '' : value.trim().toUpperCase()
          onChange(name, newValue, Operator.CONTAINS)
        }}
        value={value}
        isError={isError}
        errorMessage={errorMessage}
      />
    </Suspense>
  )
}
