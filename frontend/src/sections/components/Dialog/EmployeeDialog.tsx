import { forwardRef, useImperativeHandle, lazy, Suspense, useRef, useState } from "react"
import { type Action, useFormEmployee } from "@/sections/page/FormEmployee/useFormEmployee"

export type EmployeeDialogRef = {
  handleChange: (name: Action["type"], value: string) => void
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>  
}

const DialogAdd = lazy(async () => import("./dialog"))
const EmployeeInputs = lazy(async () => import("@/sections/page/FormEmployee/EmployeInputs").then(m => ({ default: m.EmployeeInputs })))

function EmployeeFormDialog() {
  const employeeRef = useRef(null)
  const [open, toggleOpen] = useState(false)
  const { disabled, error, formData, handleChange, handleSubmit, required, resetForm } = useFormEmployee()

  useImperativeHandle(employeeRef, () => ({
    handleChange,
    toggleOpen
  }))

  return (
    <div ref={employeeRef}>
      <Suspense>
        <DialogAdd        
          title='Agregar un nuevo Usuario'
          contextText='¿No existe el usuario en la lista? Por favor, añada uno nuevo.'
          open={open}
          toggleOpen={toggleOpen}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
        >
          <Suspense>
            <EmployeeInputs
              formData={formData}          
              handleChange={handleChange}
              disabled={disabled}
              error={error}
              required={required}
            />
          </Suspense>
        </DialogAdd>
      </Suspense>
    </div>
  )
}

export const EmployeeDialog = forwardRef(EmployeeFormDialog)