import { lazy, Suspense, useEffect } from "react";
import { type BrandPrimitives } from "../../../modules/devices/brand/domain/Brand";
import { useGenericFormData } from "../../Hooks/useGenericFormData";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";
import { useGenericForm, FormStatus } from "../../Hooks/useGenericForm";

interface Props {
  dialogValue: BrandPrimitives
  open: boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  createBrand: (formData: BrandPrimitives) => Promise<void>
}

const DialogAdd = lazy(async () => import("./dialog"))
const BrandNameInput = lazy(async () => import("../text-inputs/BrandNameInput"))
export function BrandDialog({ dialogValue, open, toggleOpen, createBrand }: Props) {
  const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
  const { formStatus, resetFormStatus, submitForm } = useGenericForm<BrandPrimitives>({create: createBrand})

  useEffect(() => {
    updateForm(dialogValue)
    return () => {
      resetForm()
    }
  }, [dialogValue, resetForm, updateForm])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
      toggleOpen(false)
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus, resetForm, resetFormStatus, toggleOpen])

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
      title='Agregar una nueva marca'
      contextText='¿No existe la marca en la lista? Por favor, añada uno nuevo.'
      open={open}
      toggleOpen={toggleOpen}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
    >
      <Suspense fallback={<InputSkeletonLoading />}>
        <BrandNameInput
          value={formData.name}
          type='dialog'
          onChange={handleChange}
        />
      </Suspense>
    </DialogAdd>
  )
}