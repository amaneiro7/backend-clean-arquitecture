import { Suspense, useLayoutEffect, useMemo, useState } from "react";
import { DeviceEmployee } from "../../../modules/devices/devices/devices/domain/DeviceEmployee";
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import ComboBox from "./combo_box";
import { useAppContext } from "../../Context/AppContext";
import { useEmployee } from "../../Device/employee/useEmployee";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";
import EmployeeDialog from "../Dialog/EmployeeDialog";
import { EmployeePrimitives } from "../../../modules/employee/employee/domain/Employee";

interface Props {
  value: Primitives<DeviceEmployee>
  name: string
  status?: Primitives<StatusId>
  onChange: OnHandleChange
  type?: 'form' | 'search'
}

export default function EmployeeComboBox({ value, name, onChange, status, type = 'search' }: Props) {
  const { repository } = useAppContext()
  const { employees, loading, createEmployee } = useEmployee(repository)  
  const employeeOptions = useMemo(() => (
    employees.map(employee => ({ id: employee.id, name: employee.userName }))
  ), [employees, loading])

  const initialValue = useMemo(() => (
    employeeOptions.find(employee => employee.id === value)
  ), [employeeOptions, value])

  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState<EmployeePrimitives>({ userName: '' });

  useLayoutEffect(() => {
    if (type !== 'form') return;

    if (value === undefined) {      
      return
    }


    const isValid = DeviceEmployee.isValid(value, status)
    setIsDisabled(StatusId.StatusOptions.INUSE !== status)
    
    setIsError(!isValid)
    setErrorMessage(isValid ? '' : DeviceEmployee.invalidMessage())
    
    return () => {
      setErrorMessage('')
      setIsError(false)
    }
  }, [value, status])
  
  useLayoutEffect(() => {
    if (isDisabled) {
      onChange(name, '')
    }
  }, [isDisabled])

  return (
    <Suspense>
      <ComboBox
        id={name}
        initialValue={initialValue}
        label="Usuarios"
        name={name}
        type={type}
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                userName: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              userName: newValue.inputValue
            });
          } else {
            const hasNewValue = newValue ? newValue.id : ''
            const isInputDisabled = isDisabled ? '' : hasNewValue
            onChange(name, isInputDisabled, Operator.EQUAL)
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
          <Suspense>
            <EmployeeDialog createEmployee={createEmployee} dialogValue={dialogValue} open={open} toggleOpen={toggleOpen} />
          </Suspense>}
      </ComboBox>
    </Suspense>
  )
}