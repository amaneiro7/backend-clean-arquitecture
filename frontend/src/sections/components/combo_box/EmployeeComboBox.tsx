import { lazy, useEffect, useMemo, useState } from "react"
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
}

interface NewValue extends EmployeePrimitives {
  inputValue: string
}

const EmployeeDialog = lazy(async () => import("../Dialog/EmployeeDialog"))
const ComboBox = lazy(async () => import("./combo_box"))
export default function EmployeeComboBox({ value, name, onChange, status, type = 'search' }: Props) {
  const { useEmployee: { employees, loading, createEmployee } } = useAppContext()
  const employeeOptions = useMemo(() => (
    employees.map(employee => ({ id: employee.id, name: employee.userName }))
  ), [employees])

  const initialValue = useMemo(() => (
    employeeOptions.find(employee => employee.id === value)
  ), [employeeOptions, value])

  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState<EmployeePrimitives>(defaultInitialEmployeeState)

  useEffect(() => {
    if (type !== 'form') return

    if (value === undefined) {
      return
    }

    const isValid = DeviceEmployee.isValid(value, status)
    if (StatusId.StatusOptions.INUSE !== status) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }

    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceEmployee.invalidMessage())

    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, status, type])
  

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
        isRequired={false}
        isError={isError}
        loading={loading}
        errorMessage={errorMessage}
      >
        {type === 'form' &&          
          <EmployeeDialog createEmployee={createEmployee} dialogValue={dialogValue} open={open} toggleOpen={toggleOpen} />}
      </ComboBox>
    </>
  )
}