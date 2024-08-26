import { lazy, useMemo, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { defaultInitialEmployeeState } from "../../Hooks/employee/EmployeeFormInitialState"
import { DeviceEmployee } from "../../../modules/devices/devices/devices/domain/DeviceEmployee"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"

import { type EmployeePrimitives } from "../../../modules/employee/employee/domain/Employee"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"

interface Props {
  value: Primitives<DeviceEmployee>
  name: string
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}

interface NewValue extends EmployeePrimitives {
  inputValue: string
}

const EmployeeDialog = lazy(async () => import("../Dialog/EmployeeDialog"))
const ComboBox = lazy(async () => import("./combo_box"))
export default function EmployeeComboBox({ value, error, isDisabled = false, isRequired, name, onChange, type = 'search' }: Props) {
  const { useEmployee: { employees, loading, createEmployee } } = useAppContext()
  const employeeOptions = useMemo(() => (
    employees.map(employee => ({ id: employee.id, name: employee.userName }))
  ), [employees])

  const initialValue = useMemo(() => (
    employeeOptions.find(employee => employee.id === value)
  ), [employeeOptions, value])

  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState<EmployeePrimitives>(defaultInitialEmployeeState)

  return (
    <>
      <ComboBox
        id={name}
        initialValue={initialValue}
        label='Usuarios'
        name={name}
        type={type}
        onChange={(_, newValue: NewValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true)
              setDialogValue({
                userName: newValue
              })
            })
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true)
            setDialogValue({
              userName: newValue.inputValue
            })
          } else {
            const hasNewValue = newValue ? newValue.id : ''
            onChange(name, hasNewValue, Operator.EQUAL)
          }
        }}
        options={employeeOptions}
        isDisabled={isDisabled}
        isRequired={isRequired}
        isError={!!error}
        loading={loading}
        errorMessage={error}
      >
        {type === 'form' &&          
          <EmployeeDialog createEmployee={createEmployee} dialogValue={dialogValue} open={open} toggleOpen={toggleOpen} />}
      </ComboBox>
    </>
  )
}