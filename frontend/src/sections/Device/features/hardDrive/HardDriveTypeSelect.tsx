import { Suspense, lazy, useEffect, useState } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { useHardDriveType } from './useHardDriveType'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'
import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { ComputerHDDType } from '../../../../modules/devices/fetures/computer/domain/ComputerHDDtype'
import { type ComputerHDDCapacity } from '../../../../modules/devices/fetures/computer/domain/ComputerHHDCapacity'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: Primitives<ComputerHDDType>
  hardDriveCapacity?: Primitives<ComputerHDDCapacity>
  onChange: OnHandleChange
  isForm?: boolean
}

export default function HardDriveTypeSelect ({ value, hardDriveCapacity, onChange, isForm }: Props) {
  const { repository } = useAppContext()
  const { hardDriveType } = useHardDriveType(repository)

  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisbaled, setIsDisbled] = useState(false)

  useEffect(() => {
    if (!isForm) return

    const isValid = ComputerHDDType.isValid(value, hardDriveCapacity)
    setIsDisbled(hardDriveCapacity === '')

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : ComputerHDDType.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, hardDriveCapacity])

  return (
        <Suspense>
            <Select
                label='Tipo de Disco Duro'
                name='hardDriveTypeId'
                onChange={(event) => {
                  const { name, value } = event.target
                  const newValue = isDisbaled ? '' : value
                  onChange(name, newValue)
                }}
                options={hardDriveType}
                placeholder='-- Filtre por Tipo de Disco --'
                isHidden={false}
                isDisabled={isDisbaled}
                isRequired={isForm}
                value={value}
                isError={isError}
                errorMessage={errorMessage}
            />
        </Suspense>
  )
}
