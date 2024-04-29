import { lazy, Suspense, useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { useOperatingSystemVersions } from '../../Device/features/operatingSystem/useOperatingSystemVersion'
import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'
import { ComputerOs } from '../../../modules/devices/fetures/computer/domain/ComputerOS'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { type ComputerHDDCapacity } from '../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity'

const Select = lazy(async () => await import('./Select'))

interface Props {
  value: Primitives<ComputerOs>
  status?: Primitives<StatusId>
  hardDriveCapacity?: Primitives<ComputerHDDCapacity>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function OperatingSystemVersionSelect ({ value, hardDriveCapacity, status, onChange, isForm }: Props) {
  const { repository } = useAppContext()
  const { operatingSystem } = useOperatingSystemVersions(repository)
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    if (!isForm) return
    handleDisabled()

    const isValid = ComputerOs.isValid(value, status, hardDriveCapacity)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerOs.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status, hardDriveCapacity])

  const handleDisabled = () => {
    const name = 'operatingSystemId'
    const value = ''
    if (StatusId.StatusOptions.INUSE !== status || hardDriveCapacity === '') {
      onChange(name, value)
      setIsDisabled(true)
      return
    }
    setIsDisabled(false)
  }

  return (
    <Suspense>
      <Select
        label='Sistemas Operativo'
        name='operatingSystemId'
        onChange={(event) => {
          const { name, value } = event.target
          const newValue = isDisabled ? '' : value
          onChange(name, newValue)
        }}
        options={operatingSystem}
        placeholder='-- Filtre por Sistema Operativo --'
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
