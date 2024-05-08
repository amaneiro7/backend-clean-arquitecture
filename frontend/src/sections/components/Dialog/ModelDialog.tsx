import { lazy, Suspense, useEffect } from "react";
import { useGenericFormData } from "../../Hooks/useGenericFormData";
import { ModelPrimitives } from "../../../modules/devices/model/model/domain/Model";
import { useModelForm, FormStatus } from "../../Hooks/model/useModelForm";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";

interface Props {
    dialogValue: ModelPrimitives
    open: boolean,
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogAdd = lazy(async () => import("./dialog"))
const CategoryComboBox = lazy(async () => import("../combo_box/CategoryComboBox"))
const BrandComboBox = lazy(async () => import("../combo_box/BrandComboBox"))
const ModelNameInput = lazy(async () => import("../text-inputs/ModelNameInput"))

export default function ModelDialog ({ dialogValue, open, toggleOpen }: Props) {    
    const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
    const { formStatus, resetFormStatus, submitForm } = useModelForm()    
  
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
            title="Agregar un nuevo modelo"
            contextText="¿No existe el modelo en la lista? Por favor, añada uno nuevo."
            open={open}
            toggleOpen={toggleOpen}            
            handleSubmit={handleSubmit}
            resetForm={resetForm}            
        >   
            <Suspense fallback={<InputSkeletonLoading/>}>
                <CategoryComboBox
                    onChange={handleChange}
                    value={formData.categoryId}
                    type="form"
                />
            </Suspense> 
            <Suspense fallback={<InputSkeletonLoading/>}>
                <BrandComboBox 
                    value={formData.brandId}
                    categoryId={formData.categoryId}
                    onChange={handleChange}
                    type="form"
                />
            </Suspense> 
            <Suspense fallback={<InputSkeletonLoading/>}>
                <ModelNameInput
                    value={formData.name}
                    onChange={handleChange}
                />
            </Suspense> 
        </DialogAdd>
    )
}