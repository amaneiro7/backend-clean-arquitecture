import { type FormEvent, useEffect } from 'react'
import { useGenericFormData } from '../../Hooks/useGenericFormData'
import { FormContainer } from '../../components/formContainer'
import { FormStatus, useModelForm } from './useModelForm'
import BrandSelect from '../brand/BrandSelect'
import CategorySelect from '../category/CategorySelect'
import ModelNameInput from './ModelNameInput'
import { useModelInitialState } from './BrandFormInitialState'

const initialState = {
  name: '',
  categoryId: 0,
  brandId: ''
}

export default function CreateModelForm () {
  const { formData, updateForm, resetForm } = useGenericFormData(initialState)
  const { formStatus, submitForm, resetFormStatus } = useModelForm()
  const { preloadedModelState } = useModelInitialState()

  useEffect(() => {
    updateForm(preloadedModelState)

    return () => {
      resetForm()
    }
  }, [preloadedModelState])

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
    const { name, categoryId, brandId } = formData
    await submitForm({ name, categoryId, brandId })
  }

  const handleClose = () => {
    window.history.back()
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateForm({ [ev.target.name]: ev.target.value })
  }

  return (
    <FormContainer
        title='Agrega un nuevo Modelo'
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        isDisabled={formStatus === FormStatus.Loading}
    >
        <CategorySelect
        value={formData.categoryId}
        onChange={handleChange}
      />
      <BrandSelect
        value={formData.brandId}
        onChange={handleChange}
      />
      <ModelNameInput
          value={formData.name}
          onChange={handleChange}
      />
    </FormContainer>
  )
}
