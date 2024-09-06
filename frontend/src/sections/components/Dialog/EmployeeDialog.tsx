import { lazy, Suspense } from "react"
import { useFormEmployee } from "@/sections/page/FormEmployee/useFormEmployee"
import { type DefaultEmployeeProps } from "@/sections/Hooks/employee/DefaultInitialState"
import { Subtitle } from "../Typography/Subtitle"
import { Paragraph } from "../Typography/Paragraph"

const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const EmployeeInputs = lazy(async () => import("@/sections/page/FormEmployee/EmployeInputs").then(m => ({ default: m.EmployeeInputs })))

export function EmployeeDialog({ 
  initialDialogValue,
  handleClose
}:{ 
  initialDialogValue?: DefaultEmployeeProps
  handleClose: () => void
}) {
  const { disabled, error, formData, handleChange, handleSubmit, required, processing } = useFormEmployee(initialDialogValue)
  const onSubmit = async(event: React.FormEvent) => {
    handleSubmit(event)
    handleClose()
  }

  return (
    <Suspense>
      <FormComponent
        key='employee-dialog-form'
        id='employee-dialog-form'
        isDisabled={processing}
        handleSubmit={onSubmit}
        method='dialog'
        handleClose={handleClose}
      >
        <Subtitle variant='h5' color='black' text='Agregar un nuevo usuario' />
        <Paragraph variant='p' color='gray' text='¿No existe el usuario en la lista? Por favor, añada uno nuevo' />
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