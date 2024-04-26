import { lazy, Suspense, useEffect, useState } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useOperatingSystemArq } from './useOperatingSystemArq'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { ComputerOsArq } from '../../../../modules/devices/fetures/computer/domain/ComputerOSArq'
import { type ComputerOs } from '../../../../modules/devices/fetures/computer/domain/ComputerOS'

const Select = lazy(async () => await import('../../../components/Select/Select'))

interface Props {
  value: Primitives<ComputerOsArq>
  operatingSystem?: Primitives<ComputerOs>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function OperatingSystemArqSelect ({ value, operatingSystem, onChange, isForm }: Props) {
  const { repository } = useAppContext()
  const { operatingSystemArq } = useOperatingSystemArq(repository)
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (!isForm) return
    handleDisabled()
    const isValid = ComputerOsArq.isValid(value, operatingSystem)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerOsArq.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, operatingSystem])

  const handleDisabled = () => {
    const name = 'operatingSystemArqId'
    const value = ''
    if (operatingSystem === '') {
      onChange(name, value)
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }

  return (
    <Suspense>
      <Select
        label='Arquitectura del Sistema Operativo'
        name='operatingSystemArqId'
        onChange={(event) => {
          const { name, value } = event.target
          const newValue = isDisabled ? '' : value
          onChange(name, newValue)
        }}
        options={operatingSystemArq}
        placeholder='-- Filtre Arquitectura del Sistema Operativo --'
        isRequired={isForm}
        isHidden={false}
        isDisabled={isDisabled}
        value={value}
        isError={isError}
        errorMessage={errorMessage}
      />
    </Suspense>
  )
}
