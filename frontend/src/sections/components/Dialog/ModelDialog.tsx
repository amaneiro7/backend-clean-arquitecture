import { lazy, Suspense, useEffect } from "react"
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { ModelPrimitives } from "../../../modules/devices/model/model/domain/Model"
import { FormStatus, useGenericForm } from "../../Hooks/useGenericForm"

interface Props {
  dialogValue: ModelPrimitives
  open: boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  createModel: (formData: ModelPrimitives) => Promise<void>
}

const DialogAdd = lazy(async () => import("./dialog"))
const ModelInputs = lazy(async () => import("../../page/FormModel/ModelFeatures").then(m => ({ default: m.ModelInputs })))

export default function ModelDialog({ dialogValue, open, toggleOpen, createModel }: Props) {
  const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
  const { formStatus, resetFormStatus, submitForm } = useGenericForm({create: createModel})

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
      <Suspense>
        <ModelInputs formData={formData} onChange={handleChange} isAddForm />
      </Suspense>
    </DialogAdd>
  )
}