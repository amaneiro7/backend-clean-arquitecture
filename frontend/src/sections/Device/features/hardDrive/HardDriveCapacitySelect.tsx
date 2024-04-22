import { Suspense, lazy, useEffect, useState } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveCapacity } from './useHardDriveCapacity'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'

import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { ComputerHDDCapacity } from '../../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity'
import { type StatusId } from '../../../../modules/devices/devices/status/domain/StatusId'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: Primitives<ComputerHDDCapacity>
  status: Primitives<StatusId>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function HardDriveCapacitySelect ({ value, status, onChange, isForm = false }: Props) {
  const { repository } = useAppContext()
  const { hardDriveCapacity } = useHardDriveCapacity(repository)
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!isForm) return

    const isValid = ComputerHDDCapacity.isValid(value, status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerHDDCapacity.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status])

  return (
        <Suspense>
            <Select
                 label='Capacidad de Disco Duro'
                 name='hardDriveCapacityId'
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value)
                 }}
                 options={hardDriveCapacity}
                 placeholder='-- Filtre por Tamaño de Disco --'
                 isHidden={true}
                 isDisabled={false}
                 isRequired={isForm}
                 value={value}
                 isError={isError}
                 errorMessage={errorMessage}
            />
        </Suspense>
  )
}
