import { Suspense, lazy } from 'react'
import { useAppContext } from '../../../Context/AppContext'
import { type Primitives } from '../../../../modules/shared/domain/value-object/Primitives'

import { type OnHandleChange } from '../../../../modules/shared/domain/types/types'
import { Operator } from '../../../../modules/shared/domain/criteria/FilterOperators'
import { type EmployeeId } from '../../../../modules/employee/employee/domain/EmployeeId'
import { useEmployee } from '../useEmployee'

const Select = lazy(async () => await import('../../../ui/Select'))

interface Props {
  value: Primitives<EmployeeId>
  onChange: OnHandleChange
  isRequired?: boolean
}

export function EmployeeSelect ({ value, onChange, isRequired = false }: Props) {
  const { repository } = useAppContext()
  const { employees } = useEmployee(repository)
  const employeeOptions = employees.map((employee) => ({ name: employee.userName, id: employee.id }))

  return (
        <Suspense>
            <Select
                 label='Empleados'
                 name='employeeId'
                 onChange={(event) => {
                   const { name, value } = event.target
                   onChange(name, value, Operator.CONTAINS)
                 }}
                 options={employeeOptions}
                 placeholder='-- Filtre por Empleado --'
                 isHidden={true}
                 isDisabled={false}
                 isRequired={isRequired}
                 value={value}
            />
        </Suspense>
  )
}
