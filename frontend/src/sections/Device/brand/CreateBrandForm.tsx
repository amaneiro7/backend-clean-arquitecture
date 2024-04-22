import { type FormEvent, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { FormStatus, useBrandForm } from './useBrandForm'
import BrandNameInput from './BrandNameInput'
import { useBrandInitialState } from './BrandFormInitialState'

const initialState = {
  name: ''
}

export default function CreateBrandForm () {
  const { preloadedBrandState } = useBrandInitialState()
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
      handleClose()
    }
    if (formStatus === FormStatus.Error) {
      resetFormStatus()
    }
  }, [formStatus])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await submitForm(formData)
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (name: string, value: string) => {
    updateForm({ [name]: value })
  }

  return (
    <FormContainer
        title='Agrega una nueva Marca'
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
