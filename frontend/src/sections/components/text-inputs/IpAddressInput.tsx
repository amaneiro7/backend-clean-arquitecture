import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { IPAddress } from '../../../modules/devices/fetures/computer/domain/IPAddress'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { InputSkeletonLoading } from '../Loading/inputSkeletonLoading'

interface Props {
  value: Primitives<IPAddress>
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search' | 'dialog'
}

const FormInput = lazy(async () => import('../../ui/text-field'))

export function IpAddressInput({ value, status, onChange, type = 'form' }: Props) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  const [isDisabled, setIsDisabled] = useState(true)
  useLayoutEffect(() => {
    if (type !== 'form') return


    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = IPAddress.isValid(value, status)
    setIsDisabled(status !== StatusId.StatusOptions.INUSE)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : IPAddress.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status])

  useLayoutEffect(() => {
    if (isDisabled) {
      onChange('ipAddress', '')
    }
  }, [isDisabled])

  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
        id='ipAddress'
        name="ipAddress"
        type="text"
        label='Direccion IP'
        placeholder='-- Ingrese la IP del equipo --'
        isRequired={type === 'form' && !isDisabled}
        isDisabled={isDisabled}
        handle={(event) => {
          const { name, value } = event.target
          const newValue = isDisabled ? '' : value
          onChange(name, newValue)
        }}
        value={value ?? ''}
        isError={isError}
        errorMessage={errorMessage}
      />
    </Suspense>
  )
}
