import { lazy, Suspense } from "react"
import { useFormEmployee } from "@/sections/page/FormEmployee/useFormEmployee"


const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const EmployeeInputs = lazy(async () => import("@/sections/page/FormEmployee/EmployeInputs").then(m => ({ default: m.EmployeeInputs })))

export function EmployeeDialog() {  
  const { disabled, error, formData, handleChange, handleSubmit, required, processing } = useFormEmployee()

  return (
    <Suspense>
      <FormComponent 
        isDisabled={processing}
        handleSubmit={handleSubmit}
        handleClose={() => console.log(close)}
      >
        <Suspense>
          <EmployeeInputs 
            disabled={disabled} 
            error={error} 
            formData={formData} 
            handleChange={handleChange} 
            required={required}
          />
        </Suspense>
      </FormComponent>
    </Suspense>
  )
}