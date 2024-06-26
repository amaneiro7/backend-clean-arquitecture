import { lazy, Suspense, useEffect, useRef, useState, type FC } from 'react'
import { MACAddress } from '../../../modules/devices/fetures/computer/domain/MACAddress'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { InputSkeletonLoading } from '../skeleton/inputSkeletonLoading'

interface Props {
  value: Primitives<MACAddress>
  onChange: OnHandleChange
  isForm?: boolean
  isRequired?: boolean
}

const FormInput = lazy(async () => import('./FormInput').then(m => ({ default: m.FormInput })))

const MacAddressInput: FC<Props> = ({ value, onChange, isForm = false, isRequired = false }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const isFirstInput = useRef(true)
  useEffect(() => {
    if (!isForm) return

    if (isFirstInput.current) {
      isFirstInput.current = value === ''
      return
    }

    const isValid = MACAddress.isValid(value)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : MACAddress.invalidMessage(value))

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value])
  return (
    <Suspense fallback={<InputSkeletonLoading />}>
      <FormInput
        id='macAddress'
        name="macAddress"
        type="text"
        label='Direccion MAC'
        placeholder='-- Ingrese la MAC del equipo --'
        isRequired={isRequired}
        handle={(event) => {
          const { name, value } = event.target
          onChange(name, value)
        }}
        value={value ?? ''}
        isError={isError}
        errorMessage={errorMessage}
      />

    </Suspense>
  )
}

export default MacAddressInput
