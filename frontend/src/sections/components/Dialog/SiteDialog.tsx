import { lazy, Suspense } from "react"

import { type DefaultSiteProps } from "@/sections/Hooks/locations/site/DefaultSiteInitialState"
import { useFormSite } from "@/sections/page/FormSite/useFormSite"

interface Props {
  initialDialogValue?: DefaultSiteProps
  handleClose: () => void
}

const FormComponent = lazy(async () => import("../formContainer/FormComponent").then(m => ({ default: m.FormComponent })))
const SiteInputs = lazy(async () => import("../../page/FormSite/SiteInputs").then(m => ({ default: m.SiteInputs })))
const Subtitle = lazy(async () => import("../Typography/Subtitle").then(m => ({ default: m.Subtitle })))
const Paragraph = lazy(async () => import("../Typography/Paragraph").then(m => ({ default: m.Paragraph })))

export function SiteDialog({ handleClose, initialDialogValue }: Props) {
  const { formData, handleChange, handleSubmit, processing, disabled, error, required } = useFormSite(initialDialogValue)

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
        <Suspense>
          <Subtitle variant='h5' color='black' text='Agregar una nuevo sitio' />
        </Suspense>
        <Suspense>
          <Paragraph variant='p' color='gray' text='¿No existe el sitio en la lista? Por favor, añada uno nuevo.' />
        </Suspense>
        <Suspense>
          <SiteInputs 
            isAddForm
            formData={formData}
            handleChange={handleChange} 
            disabled={disabled}
            error={error}
            required={required}
          />
        </Suspense>
      </FormComponent>
    </Suspense>    
  )
}