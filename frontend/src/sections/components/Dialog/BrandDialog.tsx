import { lazy, Suspense, useEffect } from "react";
import { useGenericFormData } from "../../Hooks/useGenericFormData";
import { BrandPrimitives } from "../../../modules/devices/brand/domain/Brand";
import { FormStatus, useBrandForm } from "../../Hooks/brand/useBrandForm";
import { InputSkeletonLoading } from "../skeleton/inputSkeletonLoading";

interface Props {
  dialogValue: BrandPrimitives
  open: boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogAdd = lazy(async () => import("./dialog"))
const BrandNameInput = lazy(async () => import("../text-inputs/BrandNameInput"))
export default function BrandDialog({ dialogValue, open, toggleOpen }: Props) {
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
    <Suspense>
      <DialogAdd
        title="Agregar una nueva marca"
        contextText="¿No existe la marca en la lista? Por favor, añada uno nuevo."
        open={open}
        toggleOpen={toggleOpen}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      >
        <Suspense fallback={<InputSkeletonLoading />}>
          <BrandNameInput
            value={formData.name}
            type="dialog"
            onChange={handleChange}
          />
        </Suspense>
      </DialogAdd>
    </Suspense>
  )
}