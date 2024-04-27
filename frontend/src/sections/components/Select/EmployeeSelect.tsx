import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import { type Primitives } from '../../../modules/shared/domain/value-object/Primitives'

import { type OnHandleChange } from '../../../modules/shared/domain/types/types'
import { Operator } from '../../../modules/shared/domain/criteria/FilterOperators'
import { useEmployee } from '../../Device/employee/useEmployee'
import { StatusId } from '../../../modules/devices/devices/status/domain/StatusId'
import { DeviceEmployee } from '../../../modules/devices/devices/devices/domain/DeviceEmployee'

const Select = lazy(async () => await import('./Select'))

interface Props {
  value: Primitives<DeviceEmployee>
  status: Primitives<StatusId>
  onChange: OnHandleChange
  isForm?: boolean
}

export function EmployeeSelect ({ value, onChange, status, isForm = false }: Props) {
  const { repository } = useAppContext()
  const { employees } = useEmployee(repository)
  const employeeOptions = useMemo(() => employees.map(employee => ({ id: employee.id, name: employee.userName })), [employees])

  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisbaled, setIsDisbled] = useState(false)

  useEffect(() => {
    if (!isForm) return

    const isValid = DeviceEmployee.isValid(value, status)
    setIsDisbled(StatusId.StatusOptions.INUSE !== status)

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceEmployee.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status])

  return (
        <Suspense>
            <Select
                 label='Empleados'
                 name='employeeId'
                 onChange={(event) => {
                   const { name, value } = event.target
                   const newValue = isDisbaled ? '' : value
                   onChange(name, newValue, Operator.CONTAINS)
                 }}
                 options={employeeOptions}
                 placeholder='-- Filtre por Empleado --'
                 isHidden={true}
                 isDisabled={isDisbaled}
                 isRequired={false}
                 value={value}
                 isError={isError}
                 errorMessage={errorMessage}
            />
        </Suspense>
  )
}
