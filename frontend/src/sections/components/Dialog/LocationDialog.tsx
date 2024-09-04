import { lazy, useEffect } from "react"
import { useGenericFormData } from "../../Hooks/useGenericFormData"
import { FormStatus, useGenericForm } from "../../Hooks/useGenericForm"
import { type LocationPrimitives } from "../../../modules/location/locations/domain/location"
import { useFormLocation } from "@/sections/page/FormLocation/useFormLocation"

interface Props {
  dialogValue: LocationPrimitives
  open: boolean,
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  createLocation: (formData: LocationPrimitives) => Promise<void>
}

const DialogAdd = lazy(async () => import("./dialog"))
const LocationInputs = lazy(async () => import("../../page/FormLocation/LocationInputs").then(m => ({ default: m.LocationInputs })))

export function LocationDialog({ dialogValue, open, toggleOpen, createLocation }: Props) {
  const { isAddForm, formData, handleChange, handleClose, handleSite, handleSubmit, resetForm, processing, disabled, error, required } = useFormLocation()

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