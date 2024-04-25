import { useEffect, useMemo, useState } from "react";
import { DeviceEmployee } from "../../../modules/devices/devices/devices/domain/DeviceEmployee";
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId";
import { OnHandleChange } from "../../../modules/shared/domain/types/types";
import { Primitives } from "../../../modules/shared/domain/value-object/Primitives";
import ComboBox from "./combo_box";
import { useAppContext } from "../../Context/AppContext";
import { useEmployee } from "../../Device/employee/useEmployee";
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators";

interface Props {
    value: Primitives<DeviceEmployee>
    status: Primitives<StatusId>
    onChange: OnHandleChange
    isForm?: boolean
  }

export default function EmployeeComboBox ({ value, onChange, status, isForm = false }: Props) {
    const { repository } = useAppContext()
    const { employees, loading } = useEmployee(repository)
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
        <ComboBox
            id='employeeId'
            label="Usuarios"
            name='employeeId'
            onChange={(_, newValue) => {
                onChange('employeeId', newValue.id, Operator.CONTAINS)
            }}
            options={employeeOptions}
            isDisabled={isDisbaled}
            isRequired={false}
            isError={isError}
            loading={loading}

            errorMessage={errorMessage}

        />
    )
}