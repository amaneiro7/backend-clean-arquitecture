import { type FormEvent, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { FormStatus, useBrandForm } from './useBrandForm'
import BrandNameInput from './BrandNameInput'
import { toast } from 'sonner'
import { useBrandInitialState } from './BrandFormInitialState'

const initialState = {
  name: ''
}

export default function CreateBrandForm () {
  const { id: brandId, preloadedBrandState } = useBrandInitialState()
  const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useBrandForm()

  useEffect(() => {
    updateForm(preloadedBrandState)

    return () => {
      resetForm()
    }
  }, [preloadedBrandState])

  useEffect(() => {
    if (formStatus === FormStatus.Success) {
      resetFormStatus()
      resetForm()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const { name } = formData
    await submitForm({ id: brandId, name })
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateForm({ [ev.target.name]: ev.target.value })
  }

  return (
    <FormContainer
        title='Agrega un nuevo Dispositivo'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled={formStatus === FormStatus.Loading}
    >
      <BrandNameInput
          value={formData.name}
          onChange={handleChange}
      />
    </FormContainer>
  )
}
