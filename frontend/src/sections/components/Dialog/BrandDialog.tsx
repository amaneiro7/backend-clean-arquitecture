import { useEffect } from "react";
import DialogAdd from "./dialog";
import { useGenericFormData } from "../../Hooks/useGenericFormData";
import { BrandPrimitives } from "../../../modules/devices/brand/domain/Brand";
import { FormStatus, useBrandForm } from "../../Hooks/brand/useBrandForm";
import BrandNameInput from "../text-inputs/BrandNameInput";

interface Props {
    dialogValue: BrandPrimitives
    open: boolean,
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BrandDialog ({ dialogValue, open, toggleOpen }: Props) {    
    const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
    const { formStatus, resetFormStatus, submitForm } = useBrandForm()    
  
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
            title="Agregar una nueva marca"
            contextText="¿No existe la marca en la lista? Por favor, añada uno nuevo."
            open={open}
            toggleOpen={toggleOpen}            
            handleSubmit={handleSubmit}
            resetForm={resetForm}            
        >
            <BrandNameInput
                value={formData.name}
                type="dialog"
                onChange={handleChange}
            />
        </DialogAdd>
    )
}