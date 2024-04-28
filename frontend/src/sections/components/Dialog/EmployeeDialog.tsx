import { useEffect } from "react";
import DialogAdd from "./dialog";
import { useGenericFormData } from "../../Hooks/useGenericFormData";
import { FormStatus, useEmployeeForm } from "../../Device/employee/useEmployeeForm";
import EmployeeUserNameInput from "../text-inputs/UserNameInput";
import { EmployeePrimitives } from "../../../modules/employee/employee/domain/Employee";

interface Props {
    dialogValue: EmployeePrimitives
    open: boolean,
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
    createEmployee: (formData: EmployeePrimitives) => Promise<void>
}

export default function EmployeeDialog ({ createEmployee, dialogValue, open, toggleOpen }: Props) {    
    const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
    const { formStatus, resetFormStatus, submitForm } = useEmployeeForm({createEmployee})    
  
    useEffect(() => {
      updateForm(dialogValue)
      return () => {
        resetForm()
      }
    }, [dialogValue])
  
    useEffect(() => {
      if (formStatus === FormStatus.Success) {
        resetFormStatus()
        resetForm()
        toggleOpen(false)
      }
      if (formStatus === FormStatus.Error) {
        resetFormStatus()
      }
    }, [formStatus])
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault()      
      event.stopPropagation()
      await submitForm(formData)
    }
  
    const handleChange = (name: string, value: string) => {
      updateForm({ [name]: value })
    }

    return (
        <DialogAdd 
            title="Agregar un nuevo Usuario"
            contextText="¿No existe el usuario en la lista? Por favor, añada uno nuevo."
            open={open}
            toggleOpen={toggleOpen}            
            handleSubmit={handleSubmit}
            resetForm={resetForm}            
        >
            <EmployeeUserNameInput
                value={formData.userName}
                type="dialog"
                onChange={handleChange}
            />
        </DialogAdd>
    )
}