import { lazy, useEffect, useRef, useState } from 'react'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { DeviceStockNumber } from '../../../modules/devices/devices/devices/domain/DeviceStockNumber'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'

interface Props {
  value: Primitives<DeviceStockNumber>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('./Input').then(m => ({default: m.Input})))

export function StockNumberInput({ value, status, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  const [isDisabled, setIsDisabled] = useState(false)
  
  useEffect(() => {
    if (type !== 'form') return
    if (!(status === StatusId.StatusOptions.INALMACEN || status === StatusId.StatusOptions.PORDESINCORPORAR)) {
      onChange('stockNumber', '')
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
    
    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }
    const isValid = DeviceStockNumber.isValid(value, status)
    
    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceStockNumber.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, type])


  return (
    <FormInput
      id='stockNumber'
      name='stockNumber'
      type='text'
      label='N° Stock'
      isRequired={false}
      disabled={isDisabled}
      onChange={(event) => {
          const { name, value } = event.target
          // value = value.replace(/\D/g, '').trim() // Remove non-numeric characters from input
          // value = value.replace(/(\d{3})(?=\d)/g, '$1.') // Add dots every 3 digits          
          const newValue = isDisabled ? '' : value
          onChange(name, newValue, Operator.CONTAINS)
        }}
      value={value ?? ''}
      error={isError}
      errorMessage={errorMessage}
    />
  )
}
