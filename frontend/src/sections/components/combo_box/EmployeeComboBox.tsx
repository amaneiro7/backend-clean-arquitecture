import { lazy, Suspense, useMemo, useRef, useState } from "react"
import { useAppContext } from "../../Context/AppProvider"
import { DeviceEmployee } from "../../../modules/devices/devices/devices/domain/DeviceEmployee"
import { StatusId } from "../../../modules/devices/devices/status/domain/StatusId"
import { Operator } from "../../../modules/shared/domain/criteria/FilterOperators"
import { type EmployeePrimitives } from "../../../modules/employee/employee/domain/Employee"
import { type Primitives } from "../../../modules/shared/domain/value-object/Primitives"
import { type OnHandleChange } from "../../../modules/shared/domain/types/types"
import { type ModalRef } from "../Dialog/Modal"
import { type DefaultEmployeeProps } from "@/sections/Hooks/employee/DefaultInitialState"


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

const Modal = lazy(async () => import("../Dialog/Modal").then(m => ({ default: m.Modal })))
const ComboBox = lazy(async () => import("./combo_box"))
const EmployeeDialog = lazy(async () => import("../Dialog/EmployeeDialog").then(m => ({ default: m.EmployeeDialog})))

export default function EmployeeComboBox({ value, error, isDisabled = false, isRequired, name, onChange, type = 'search' }: Props) {
  const { useEmployee: { employees, loading } } = useAppContext()
  const modalRef = useRef<ModalRef>(null)
  const [dialogValue, setDialogValue] = useState<DefaultEmployeeProps>({
    userName: '',
    devices: []
  })
  
  const employeeOptions = useMemo(() => (
    employees.map(employee => ({ id: employee.id, name: employee.userName }))
  ), [employees])

  const initialValue = useMemo(() => (
    employeeOptions.find(employee => employee.id === value)
  ), [employeeOptions, value])

  return (
    <Suspense>
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
              modalRef.current?.handleOpen()
              setDialogValue({
                userName: newValue
              })
            })
          } else if (newValue && newValue.inputValue) {
            modalRef.current?.handleOpen()
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
        {type === 'form' ?
          <Modal ref={modalRef}>            
            <Suspense>
              <EmployeeDialog 
                initialDialogValue={dialogValue} 
                handleClose={() => {
                  modalRef.current?.handleClose()
                 }}
              />
            </Suspense>
          </Modal>
          : null}
      </ComboBox>
    </Suspense>
  )
}