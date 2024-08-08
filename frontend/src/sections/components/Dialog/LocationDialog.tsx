import { lazy, useEffect } from "react"
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { FormStatus, useGenericForm } from "../../Hooks/useGenericForm"
import { type LocationPrimitives } from "../../../modules/location/locations/domain/location"

interface Props {
  dialogValue: LocationPrimitives
  open: boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  createLocation: (formData: LocationPrimitives) => Promise<void>
}

const DialogAdd = lazy(async () => import("./dialog"))
const LocationInputs = lazy(async () => import("../../page/FormLocation/LocationInputs").then(m => ({ default: m.LocationInputs })))

export function LocationDialog({ dialogValue, open, toggleOpen, createLocation }: Props) {
  const { formData, resetForm, updateForm } = useGenericFormData(dialogValue)
  const { formStatus, resetFormStatus, submitForm } = useGenericForm({ create: createLocation })

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
      title='Agregar una nueva ubicación'
      contextText='¿No existe la ubicación en la lista? Por favor, añada uno nuevo.'
      open={open}
      toggleOpen={toggleOpen}
      handleSubmit={handleSubmit}
      resetForm={resetForm}
    >      
      <LocationInputs formData={formData} onChange={handleChange} isAddForm />      
    </DialogAdd>
  )
}